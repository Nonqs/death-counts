import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GroupDto, ParamDto } from './dto/group.dto';
import { Request } from 'express';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('group')
export class GroupController {

    constructor(private groupService: GroupService){}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    createGroup(@Body() newGroup: GroupDto, @Req() req: Request){
        return this.groupService.createGroup(newGroup, req)
    }

    @UseGuards(JwtAuthGuard)
    @Post("join")
    joinGroup(@Body() group: GroupDto, @Req() req: Request){
        return this.groupService.joinGroup(group, req)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":groupName")
    groupInfo(@Req() req: Request, @Param() param: ParamDto){
        return this.groupService.groupInfo(req, param)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    myGroups(@Req() req: Request){
        
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":groupName")
    newDeath(@Req() req: Request, @Param() param: ParamDto){
        return this.groupService.newDeath(req, param)
    }


}
