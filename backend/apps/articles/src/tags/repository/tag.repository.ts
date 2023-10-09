import { MongooseAbstractRepository } from '@app/common';
import { TagDocument } from '../entity/schema/tag.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TagRepository extends MongooseAbstractRepository<TagDocument> {
  protected readonly logger = new Logger(TagRepository.name);

  constructor(
    @InjectModel(TagDocument.name)
    private readonly reservationModel: Model<TagDocument>,
  ) {
    super(reservationModel);
  }

  async createOrIgnore(names: string[]): Promise<void> {
    const tags = names.map((name) => {
      return { name: name };
    });

    await this.reservationModel.bulkWrite(
      tags.map((tag) => ({
        updateOne: {
          filter: { name: tag.name },
          update: { $set: tag },
          upsert: true,
        },
      })),
    );
  }
}
