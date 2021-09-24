import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BlockTransactionObject, Transaction } from 'web3-eth'

class GetBlockTransactions implements Transaction {
  @ApiProperty()
  blockHash: string;

  @ApiProperty()
  blockNumber: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  gas: number;

  @ApiProperty()
  gasPrice: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  input: string;

  @ApiProperty()
  nonce: number;

  @ApiProperty({ required: false })
  r: string

  @ApiProperty({ required: false })
  s: string

  @ApiProperty()
  to: string

  @ApiProperty()
  transactionIndex: number;

  @ApiProperty({ required: false })
  type: number

  @ApiProperty({ required: false })
  v: string

  @ApiProperty()
  value: string;
}

@ApiExtraModels(GetBlockTransactions)
export class GetBlockResult implements BlockTransactionObject {
  @ApiProperty({ required: false })
  baseFeePerGas: string

  @ApiProperty()
  difficulty: number;

  @ApiProperty()
  extraData: string;

  @ApiProperty()
  gasLimit: number;

  @ApiProperty()
  gasUsed: number;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  logsBloom: string;

  @ApiProperty()
  miner: string;

  @ApiProperty({ required: false })
  mixHash: string

  @ApiProperty()
  nonce: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  parentHash: string;

  @ApiProperty({ deprecated: true })
  receiptRoot: string;

  @ApiProperty()
  receiptsRoot: string

  @ApiProperty()
  sha3Uncles: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  stateRoot: string;

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  totalDifficulty: number;

  @ApiProperty({ type: 'array', items: {
    oneOf: [
      { type: 'string' },
      { $ref: getSchemaPath(GetBlockTransactions) }
    ]
  }})
  transactions: any;

  @ApiProperty()
  transactionRoot: string;

  @ApiProperty()
  uncles: string[];
}
