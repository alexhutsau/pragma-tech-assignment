import { Injectable, NotFoundException } from '@nestjs/common'
import { web3Instance, contractInstance } from './app.contract'
import { GetGroupResult } from './dto/get-group.dto'
import { GetIndexResult } from './dto/get-index.dto'

@Injectable()
export class AppService {
  private readonly web3 = web3Instance()
  private readonly contract = contractInstance()

  getGroupIds(): Promise<string[]> {
    return this.contract.methods.getGroupIds().call()
  }

  getGroup(id: number): Promise<GetGroupResult> {
    return this.contract.methods.getGroup(id).call()
  }

  getIndex(id: number): Promise<GetIndexResult> {
    return this.contract.methods.getIndex(id).call()
  }

  getBlock(id: number | string, returnTransactionObjects?: boolean) {
    return this.web3.eth.getBlock(id, returnTransactionObjects)
  }
}
