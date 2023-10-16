import { TagDocument } from '../entity/schema/tag.schema';

export interface ITagService {
  get7ByLikeSeqrch(name: string): Promise<TagDocument[]>;
}
