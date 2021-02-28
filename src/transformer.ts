import {
  createPrinter,
  Program,
  SourceFile,
  TransformationContext,
  TransformerFactory,
} from 'typescript';

import { config } from './config';
import { visitNodeAndChildren } from 'composite-call/dist/transformer-utils';
import { visitor } from './visitor';

function transformer(program: Program): TransformerFactory<SourceFile> {
  return (context: TransformationContext) => (file: SourceFile) => {
    const libName = context.factory.createUniqueName('compositeCall');
    const composeName = context.factory.createIdentifier(
      config.composeFunctionName,
    );
    const transformedFile = visitNodeAndChildren(
      file,
      program,
      context,
      {
        libName,
        composeName,
      },
      visitor,
      config,
    );
    console.log(createPrinter().printFile(transformedFile));
    return transformedFile;
  };
}

export default transformer;