import * as bcrypt from 'bcrypt';

/**
 *
 * @param plain
 * @param hash
 * @returns
 */
async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcrypt.compare(plain, hash); //TODO
}

export { compareHash };