

export enum SetExceptionMSG {
    CONFLICT_CODE = 'El código del conjunto ya existe',
    CONFLICT_NAME = 'El nombre del conjunto ya existe',
    BAD_REQUEST = 'Los datos del conjunto enviados son incorrectos',
    NOT_FOUND_ID = 'No se encontró ningún conjunto con ese id',
    CONFLICT_TYPE = 'El tipo de conjunto ya existe',
    NOT_FOUND_TYPE = 'El tipo de conjunto no existe',
    SET_TYPE_LINKED = 'El tipo de conjunto esta vinculado con algún conjunto',
}