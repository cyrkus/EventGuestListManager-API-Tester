var helper = require( './helpers' );

exports.user = {
  id: Number,
  username: String,
  email: String, // Check email ?
  group: Number,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  role: helper.inRoleTypes,
};

exports.client = {
  id: Number,
  name: String,
  background: String, // Convert to imageObject
  background_size: Number, // Convert to imageObject
  background_2x: String, // Convert to imageObject
  background_2x_size: Number, // Convert to imageObject
  logo: String, // Convert to imageObject
  logo_size: Number, // Convert to imageObject
  logo_2x: String, // Convert to imageObject
  logo_2x_size: Number, // Convert to imageObject
  toolbar: String, // Convert to imageObject
  toolbar_size: Number, // Convert to imageObject
  toolbar_2x: String, // Convert to imageObject
  toolbar_2x_size: Number, // Convert to imageObject
  settings: Object,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
};

exports.clientSettings = {
  toolbar_alignment: helper.inAlignmentTypes,
  color: helper.matchHexColor,
};

exports.event = {
  id: Number,
  client_id: Number,
  button_id: Number,
  name: String,
  background: helper.stringOrNull, // Convert to imageObject
  background_size: Number, // Convert to imageObject
  background_2x: helper.stringOrNull, // Convert to imageObject
  background_2x_size: Number, // Convert to imageObject
  thumbnail: helper.stringOrNull, // Convert to imageObject
  thumbnail_size: Number, // Convert to imageObject
  rules_link: Object,
  rules_short: Object,
  rules_full: Object,
  privacy_links: Object,
  privacy_text: Object,
  settings: Object,
  start_date: helper.matchDate,
  end_date: helper.matchDate,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  attendees: helper.arrayOrUndefined,
  languages: Array,
  features: Array,
  modes: Array,
};

exports.eventSettings = {
  attendee_limit: Number,
  auto_checkin: Boolean,
  rules_link_color: helper.matchHexColor,
  rules_excerpt_color: helper.matchHexColor,
  facebook: Object,
  youtube: Object,
};

exports.attendee = {
  id: Number,
  event_id: String, // Convert to number
  person_id: helper.stringOrNull, // Convert to number
  photo_id: helper.stringOrNull, // Convert to number
  guests: String, // Convert to number
  formdata: Object,
  invited: helper.matchDateOrNull,
  waiting: helper.matchDateOrNull,
  confirmed: helper.matchDateOrNull,
  reminded: helper.matchDateOrNull,
  thanked: helper.matchDateOrNull,
  rsvped: helper.matchDateOrNull,
  attended: helper.matchDateOrNull,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  created_by: helper.stringOrNull, // Convert to numberOrNull
};

exports.language = {
  id: Number,
  event_id: String, // Convert to number
  code: helper.inCountyCodes,
  default: String, // Convert to boolean
  select_text: String,
  strings: {
    select: String,
    back: String,
    email: String,
    retake: String,
    new: String,
    share: String,
    skip: String,
    save: String,
    scan_in: String,
    add_guest: String,
    sync: String,
    cancel: String,
    ok: String,
    flip: String,
    photo: String,
    video: String,
    use: String,
    exit_mode: String,
    exit_mode_body: String,
    rules_regs: String,
    privacy_policy: String,
    success: String,
    validation_error: String,
    email_sent: String,
    attachment_sent: String,
    required_questions: String,
    required_fields: String,
  },
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
};

exports.feature = {
  id: Number,
  event_id: String, // Convert to number
  button_id: String, // Convert to number
  type: helper.inFeatureTypes,
  order: String, // Convert to number
  title: Object,
  settings: Object,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  form: helper.objOrNull,
  popup_form: helper.objOrNull,
  survey: helper.objOrNull,
};

exports.featureSettings = {
  // TODO: ... ??
};

exports.mode = {
  id: Number,
  event_id: String, // Convert to number
  button_id: helper.stringOrNull, // Convert to number
  title: String,
  password: String,
  background: helper.localizedImageObject,
  background_2x: helper.localizedImageObject,
  settings: Object,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  feature_ids: Array,
};

exports.modeSettings = {
  alignment: helper.inAlignmentTypes,
  padding: {
    top: Number,
    right: Number,
    bottom: Number,
    left: Number,
  },
};

exports.person = {
  id: Number,
  language_id: helper.stringOrNull, // Convert to numberOrNull
  first_name: String,
  last_name: String,
  email: String, // Check email ?
  phone: helper.stringOrNull,
  street: helper.stringOrNull,
  city: helper.stringOrNull,
  state: helper.stringOrNull,
  zip: helper.stringOrNull,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
};

exports.button = {
  id: Number,
  name: String,
  title: String,
  margin: {
    top: Number,
    right: Number,
    bottom: Number,
    left: Number,
  },
  padding: {
    top: Number,
    right: Number,
    bottom: Number,
    left: Number,
  },
  icon: {
    path: helper.stringOrNull,
    size: Number,
  },
  icon_2x: {
    path: helper.stringOrNull,
    size: Number,
  },
  font: {
    size: String, // Convert to number
    color: helper.matchHexColor,
    family: String, // Check for valid font family
  },
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
};

exports.buttonBg = {
  path: helper.stringOrNull,
  size: Number,
  capInsets: helper.objOrUndefined,
  imageSize: helper.objOrUndefined,
};

exports.share = {
  id: Number,
  event_id: String, // Convert to number
  person_id: String, // Convert to number
  type: helper.inShareTypes,
  checkbox: helper.stringOrNull, // Convert to boolOrNull
  photo: String,
  video: helper.stringOrNull,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  created_by: helper.stringOrNull, // Convert to numberOrNull
  user: helper.objOrNull,
};

exports.signup = {
  id: Number,
  event_id: String, // Convert to number
  person_id: String, // Convert to number
  formdata: Object,
  created_at: helper.matchDate,
  updated_at: helper.matchDate,
  created_by: helper.stringOrNull, // Convert to numberOrNull
  user: helper.objOrNull,
};
