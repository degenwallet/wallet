import {createAction} from '@reduxjs/toolkit';
import {withPayloadType} from '.';

export const setCurrency = createAction('settings.set_currency', withPayloadType<string>());
