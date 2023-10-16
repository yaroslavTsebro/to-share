@Controller('tags')
export class TagController {
  constructor(@Inject(TAG_SERVICE) private readonly tagService: ITagService) {}
}
