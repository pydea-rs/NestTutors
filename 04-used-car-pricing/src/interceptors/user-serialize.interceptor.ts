import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from "src/dtos/user.dto";

interface DtoTypeAnnotation { // this is used for type annotaion dtoPrototype in UserSerializerInterceptor
    new (...args: any[]): {}
}
export function NoCredentialsUserSerialize(dtoProtoType: DtoTypeAnnotation) {
    return UseInterceptors(new UserSerializerInterceptor(dtoProtoType));
}

export class UserSerializerInterceptor implements NestInterceptor {
    
    constructor(private dtoProtoType: DtoTypeAnnotation) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Runs before request is handled by route handler.', context)
        // Whatever runs before handler
        
        return next.handle().pipe(
            map((data: any) => {
                // Run sth before reponse is converted to json by nest and sent to the user...
                console.log('Runs before response is sent to the user; ');
                return plainToClass(this.dtoProtoType, data, { // convert data(response) to the fornat 
                    excludeExtraneousValues: true
                })
                // return plainToInstance(this.dtoProtoType, data, { // convert data(response) to the fornat 
                //     excludeExtraneousValues: true
                // })
            }),
        );
    }
}