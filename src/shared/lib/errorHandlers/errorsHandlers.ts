const functionCallErrorHandler = (methodName: string, fileName: string, text: string = 'Unknown error in: ') => {
    const errorText = text + '\n' + `File: ${ fileName }\n` + `Method: ${ methodName }\n`;
    console.error( errorText );
};

export {
    functionCallErrorHandler
};
