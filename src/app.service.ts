import { Injectable, NotFoundException } from '@nestjs/common'
import appContract from './app.contract'
import { GetGroupResult } from './dto/get-group.dto'
import { GetIndexResult } from './dto/get-index.dto'

@Injectable()
export class AppService {
  private readonly contract = appContract()

  getGroupIds(): Promise<string[]> {
    return this.contract.methods.getGroupIds().call()
  }

  getGroup(id: number): Promise<GetGroupResult> {
    return this.contract.methods.getGroup(id).call()
  }

  getIndex(id: number): Promise<GetIndexResult> {
    return this.contract.methods.getIndex(id).call()
  }
}
