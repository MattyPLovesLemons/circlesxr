'use strict';

const CONSTANTS = {
  CAPTURE_DATA                  : true,
  CAPTURE_TRANSFORMS            : false,
  CAPTURE_TRANSFORM_INTERVAL_MS : 500,
};

const EXP_TYPE = {
  FITTS       : 'FITTS',
  FITTS_LOOK  : 'FITTS_LOOK'
};

const EVENT = 'CIRCLES_RESEARCH_EVENT';

const EVENT_TYPE = {
  FROM_SERVER:{
    CONNECTED         : 'CONNECTED_FROM_SERVER',
    EXPERIMENT_START  : 'EXPERIMENT_START_FROM_SERVER',
    EXPERIMENT_STOP   : 'EXPERIMENT_STOP_FROM_SERVER',
    SELECTION_START   : 'SELECTION_START_FROM_SERVER',
    SELECTION_STOP    : 'SELECTION_STOP_FROM_SERVER',
    SELECTION_ERROR   : 'SELECTION_ERROR_FROM_SERVER',
    TRANSFORM_UPDATE  : 'TRANSFORM_UPDATE_FROM_SERVER',
  },
  FROM_CLIENT:{
    CONNECTED         : 'CONNECTED_FROM_CLIENT',
    EXPERIMENT_START  : 'EXPERIMENT_START_FROM_CLIENT',
    EXPERIMENT_STOP   : 'EXPERIMENT_STOP_FROM_CLIENT',
    SELECTION_START   : 'SELECTION_START_FROM_CLIENT',
    SELECTION_STOP    : 'SELECTION_STOP_FROM_CLIENT',
    SELECTION_ERROR   : 'SELECTION_ERROR_FROM_CLIENT',
    TRANSFORM_UPDATE  : 'TRANSFORM_UPDATE_FROM_CLIENT',
  },
};

module.exports = {
  CONSTANTS,
  EXP_TYPE,
  EVENT,
  EVENT_TYPE,
};
