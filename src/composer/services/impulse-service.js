import { MediaService } from '../services/media-service';
import { NodeFactory } from '../../engine/node-factory';

export class ImpulseService {
    constructor(context, mediaService) {
        this.context = context;
        this.mediaService = mediaService;
    }
    async getImpulse(filename) {
        try {
            return await new Promise(async (resolve, reject) => {
                const buffer = await this.mediaService.getImpulse(filename);
                const reverb = NodeFactory.createNode('reverb', { context: this.context, buffer });
                reverb.ready().subscribe(ready => {
                    if (ready) {
                        resolve(reverb);
                    }
                });
            });
        } catch(e) {
            console.error(e);
        }
    }
}