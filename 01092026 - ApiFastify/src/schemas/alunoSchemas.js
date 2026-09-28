export const alunoParamsSchema = {
    type: 'object',

    properties: {
        id: {
            type: 'integer',
            minimum: 1
        }
    },

    required: ['id'],

    additionalProperties: false
}

export const alunoBodySchema = {
    type: 'object',

    properties: {
        nome: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        },

        curso: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        }
    },

    required: ['nome', 'curso'],

    additionalProperties: false
}