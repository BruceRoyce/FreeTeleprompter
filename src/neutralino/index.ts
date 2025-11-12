import neutralino from '@neutralinojs/lib';
neutralino.init();
import * as buntralino from 'buntralino-client';

// Initialize buntralino connection
(async () => {
    try {
        await buntralino.ready;
        console.log('Buntralino connection ready');
    } catch (error) {
        console.error('Failed to initialize buntralino:', error);
    }
})();
