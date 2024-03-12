import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupDto, type MembersData, ParamDto, Token } from './dto/group.dto';
import { hash } from 'bcrypt';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { compareHash } from 'src/auth/utils/handleBcrypt';

@Injectable()
export class GroupService {

    constructor(
        private prisma: PrismaService) { }

    async createGroup(newGroup: GroupDto, req: Request) {

        const { name, password } = newGroup

        const findGroup = await this.prisma.group.findFirst({
            where: {
                name
            }
        })

        if (findGroup) {
            throw new HttpException("This name already exist, try another", 404)
        }

        const hashPassword = await hash(password, 10)

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.decode(token) as Token

        const group = await this.prisma.group.create({
            data: {
                name: name,
                password: hashPassword,
                createdBy: { connect: { id: decodedToken.id } },
                members: { connect: { id: decodedToken.id } }
            }
        })

        await this.prisma.userDeath.create({
            data: {
                user: { connect: { id: decodedToken.id } },
                group: { connect: { id: group.id } },
                deaths: 0
            }
        })

        return group

    }

    async joinGroup(group: GroupDto, req: Request) {

        const { name, password } = group

        const findGroup = await this.prisma.group.findFirst({
            where: {
                name
            }
        })

        if (!findGroup) {
            throw new HttpException("The group didnt exist", 404)
        }

        const isCheck = await compareHash(password, findGroup.password);

        if (!isCheck) {
            throw new HttpException('PASSWORD_INVALID', 404)
        }

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.decode(token) as Token

        const joinGroup = await this.prisma.group.update({
            where: { id: findGroup.id },
            data: {
                members: { connect: { id: decodedToken.id } }
            }
        })

        await this.prisma.userDeath.create({
            data: {
                user: { connect: { id: decodedToken.id } },
                group: { connect: { id: findGroup.id } },
                deaths: 0
            }
        })

        return joinGroup
    }

    async groupInfo(req: Request, param: ParamDto) {
        console.log(param)

        const group = await this.prisma.group.findFirst({
            where: {
                name: param.groupName
            },
            include: {
                members: true
            }
        })

        const deathCount = await this.prisma.userDeath.findMany({
            where: {
                groupId: group.id
            }
        })


        let members: MembersData[] = []

        group.members.forEach((member) => {

            for (let i = 0; i <= deathCount.length - 1; i++) {

                if (member.id === deathCount[i].userId) {

                    const newMember = {
                        name: member.username,
                        deaths: deathCount[i].deaths
                    }

                    members.push(newMember)
                }

            }
        });

        const data = {
            ...group,
            members: members
        };

        return data

    }

    async newDeath(req: Request, param: ParamDto) {

        const findGroup = await this.prisma.group.findFirst({
            where: {
                name: param.groupName
            }
        })

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.decode(token) as Token

        const currentUserDeath = await this.prisma.userDeath.findFirst({
            where: {
                userId: decodedToken.id,
                groupId: findGroup.id
            }
        })

        const registerDeath = await this.prisma.userDeath.update({
            where: {
                id: currentUserDeath.id
            },
            data: {
                deaths: {
                    increment: 1
                }
            }
        })

        return registerDeath

    }

}
