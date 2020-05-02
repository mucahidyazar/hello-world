import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { MyContext } from '../../../src/types/MyContext';
import { redis } from '../../../src/redis';
import { User } from '../../../src/entity/User';
import { confirmationPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {

  @Mutation(() => Boolean)
  async confirmUser(
    
    @Arg('token') token: string,
    @Ctx() ctx: MyContext

  ): Promise<boolean> { //Eger password yanlissa null donecek gibi durumlarda.

    const userId = await redis.get(confirmationPrefix + token);

    if(!userId) {
      return false;
    }

    await User.update({id: parseInt(userId, 10)}, {confirmed: true});
    await redis.del(token);

    return true;
  }
}