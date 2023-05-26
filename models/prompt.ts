import { Schema, model, models, Model, Document } from 'mongoose';

interface IPrompt extends Document {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Prompt: Model<IPrompt> = models.Prompt || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
