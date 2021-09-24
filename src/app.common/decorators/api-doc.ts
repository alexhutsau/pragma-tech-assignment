import { applyDecorators, Type, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiExtraModels, ApiOperation, ApiParamOptions, ApiParam, ApiQueryOptions, ApiQuery, ApiNotFoundResponse, ApiTooManyRequestsResponse } from "@nestjs/swagger";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export interface IApiDoc {
  summary: string
  description?: string
  result: Type<unknown>
  excludeBadRequestError?: boolean
  singleParam?: ApiParamOptions
  singleQuery?: ApiQueryOptions
  deprecated?: boolean
  httpCode?: number
}

export function ApiDoc(params: IApiDoc) {
  const decorators = []

  const responseContent: ContentObject = {}

  if (params.result)
    responseContent['application/json'] = {
      schema: {
        $ref: `#/components/schemas/${params.result.name}`
      }
    }

  if (params.singleParam) {
    decorators.push(ApiParam(params.singleParam))
    decorators.push(ApiNotFoundResponse({ description: 'Not Found' }))
  }

  if (params.result)
    decorators.push(ApiExtraModels(params.result))

  if (!params.excludeBadRequestError)
    decorators.push(ApiBadRequestResponse({
      description: 'Not all required parameters were received or have not permitted values' }))

  decorators.push(
    ApiOperation({ deprecated: params.deprecated, summary: params.summary, description: params.description }),
    ApiOkResponse({ content: responseContent }),
    HttpCode(params.httpCode || HttpStatus.OK),
  )

  if (params.singleQuery) decorators.push(ApiQuery(params.singleQuery))

  return applyDecorators(...decorators)
}