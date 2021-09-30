# Logger

Simple logger

## Usage

```js
import Logger from './Logger.js';

const log = new Logger({
	level: Logger.Level.Debug,
	name: 'ModuleName'
});

log.debug('Message with debug level.');
log.info('Message with info level.');
log.warn('Message with warn level.');
log.error('Message with error level.');
```
