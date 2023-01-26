import {createAction} from '@reduxjs/toolkit';
import {withPayloadType} from './index';

export const setCurrency = createAction('settings.set_currency', withPayloadType<string>());
