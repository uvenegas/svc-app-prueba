import { model } from 'mongoose';
import { IRulesDocument } from '@domains/drugs/interface/IRulesDocument';
import { ConfigSchema } from '@domains/drugs/validation/Config.schema';

export const RulesEntity = model<IRulesDocument>('rules', ConfigSchema);
