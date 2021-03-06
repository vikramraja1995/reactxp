/**
 * View.tsx
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * Mac-specific implementation of View.
 */
import * as React from 'react';

import { View as ViewCommon } from '../native-common/View';
import { Types } from '../common/Interfaces';
import EventHelpers from '../native-common/utils/EventHelpers';

export class View extends ViewCommon {

    protected _buildInternalProps(props: Types.ViewProps) {
        // Base class does the bulk of _internalprops creation
        super._buildInternalProps(props);

        // Drag and drop related properties
        for (const name of ['onDragEnter', 'onDragOver', 'onDrop', 'onDragLeave']) {
            const handler = this._internalProps[name];

            if (handler) {
                this._internalProps.allowDrop = true;

                this._internalProps[name] = (e: React.SyntheticEvent<View>) => {
                    const dndEvent = EventHelpers.toDragEvent(e);
                    handler(dndEvent);
                };
            }
        }

        for (const name of ['onDragStart', 'onDrag', 'onDragEnd']) {
            const handler = this._internalProps[name];

            if (name === 'onDragStart') {
                this._internalProps.allowDrag = true;
            }            

            if (handler) {
                this._internalProps[name] = (e: React.SyntheticEvent<View>) => {
                    const dndEvent = EventHelpers.toDragEvent(e);
                    handler(dndEvent);
                };
            }
        }
    }

}

export default View;
