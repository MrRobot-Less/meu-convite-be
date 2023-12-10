import { NextFunction, Request, Response } from 'express';
import { Schema, ZodRawShape, z } from 'zod';

export enum ParamsType {
    QUERY = 'query',
    BODY = 'body',
}

type ValidateParams = {
    schema: ZodRawShape;
    type: ParamsType;
};

export function validator(params: ValidateParams) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = z.object(params.schema).safeParse(req[params.type]);

        if (!result.success) {
            const errorFormatted = result.error.issues.map(
                item => `${item.path.join('.')}: ${item.message}`,
            );

            const error = new Error(
                errorFormatted.toString(),
            );

            return res.status(400).json({ error: 'Invalid Request', reason: error.message });
        }

        req[params.type] = result.data;

        next();
    };
}