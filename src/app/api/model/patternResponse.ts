/**
 * Jointbox access API
 * This is a API for access management for jointbox project
 *
 * OpenAPI spec version: 1.0.0
 * Contact: dmitriy.selischev@logicify.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PatternOutDto } from './patternOutDto';
import { ServiceObject } from './serviceObject';


export interface PatternResponse { 
    service: ServiceObject;
    payload: PatternOutDto;
}
