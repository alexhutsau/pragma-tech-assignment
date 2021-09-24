import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiDoc } from './app.common/decorators/api-doc';
import { AppService } from './app.service';
import { GetGroupResult } from './dto/get-group.dto';
import { GetIndexResult } from './dto/get-index.dto';
import { isHexStrict } from 'web3-utils'
import { GetBlockResult } from './dto/get-block.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('groups')
  @ApiOkResponse({ isArray: true, type: String })
  @ApiDoc({
    summary: 'Get group ids',
    result: undefined,
    excludeBadRequestError: true
  })
  getGroupIds() {
    return this.appService.getGroupIds()
  }

  @Get('groups/:id')
  @ApiDoc({
    summary: 'Get group info',
    result: GetGroupResult,
    singleParam: { name: 'id', type: Number, description: 'Group id' },
    excludeBadRequestError: true,
  })
  async getGroup(@Param('id') groupId: any) {
    if (!Number.isInteger(groupId = +groupId) || groupId < 0)
      throw new NotFoundException()

    return this.appService.getGroup(groupId)
      .catch(err => {
        throw ((err.message as string)!.endsWith('Invalid group id'))
          ? new NotFoundException()
          : err
      })
  }

  @Get('indexes/:id')
  @ApiDoc({
    summary: 'Get index info',
    result: GetIndexResult,
    singleParam: { name: 'id', type: Number, description: 'Index id' },
    excludeBadRequestError: true,
  })
  async getIndex(@Param('id') indexId: any) {
    if (!Number.isInteger(indexId = +indexId) || indexId < 0)
      throw new NotFoundException()

    return await this.appService.getIndex(indexId)
      .catch(err => {
        throw ((err.message as string)!.endsWith('Invalid index id'))
          ? new NotFoundException()
          : err
      })
  }

  @Get('blocks/:id')
  @ApiDoc({
    summary: 'Get block info',
    result: GetBlockResult,
    singleParam: { name: 'id', type: String, description: 'BlockNumber | BlockHash | "latest"' },
    singleQuery: { name: 'boolean', type: Boolean, description: 'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions', required: false },
    excludeBadRequestError: true,
  })
  async getBlock(@Param('id') blockId: any, @Query('boolean') returnTransactionObjects: boolean) {
    if (isHexStrict(blockId)) {
      if ((blockId as string).length !== 66) throw new NotFoundException()
    }
    else if (blockId !== 'latest' && (!Number.isInteger(blockId = +blockId) || blockId < 0))
      throw new NotFoundException()

    const block = await this.appService.getBlock(blockId, returnTransactionObjects)
    if (!block) throw new NotFoundException()

    return block
  }
}
