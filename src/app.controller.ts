import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiDoc } from './app.common/decorators/api-doc';
import { AppService } from './app.service';
import { GetGroupResult } from './dto/get-group.dto';
import { GetIndexResult } from './dto/get-index.dto';

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
}
