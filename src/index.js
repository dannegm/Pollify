import '@babel/polyfill'
import 'dotenv/config'

import config from '@/config'
import { awakeBot } from './bot'

awakeBot (config)
