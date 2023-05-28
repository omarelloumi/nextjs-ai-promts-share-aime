import { Schema, model, models, Model, Document } from 'mongoose';

interface IPrompt extends Document {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tags: string;
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
  tags: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Prompt: Model<IPrompt> = models.Prompt || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
