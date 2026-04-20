import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAnnouncementAnnouncement extends Schema.CollectionType {
  collectionName: 'announcements';
  info: {
    displayName: 'Th\u00F4ng b\u00E1o / Announcement';
    pluralName: 'announcements';
    singularName: 'announcement';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::announcement.announcement',
      'oneToMany',
      'api::announcement.announcement'
    >;
    priority: Attribute.Enumeration<['high', 'medium', 'low']> &
      Attribute.DefaultTo<'medium'>;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthorAuthor extends Schema.CollectionType {
  collectionName: 'authors';
  info: {
    displayName: 'T\u00E1c gi\u1EA3 / Author';
    pluralName: 'authors';
    singularName: 'author';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    avatar: Attribute.Media<'images'>;
    bio: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email;
    linkedin: Attribute.String;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::author.author',
      'oneToMany',
      'api::author.author'
    >;
    name: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerPlacementBannerPlacement
  extends Schema.CollectionType {
  collectionName: 'banner_placements';
  info: {
    displayName: 'V\u1ECB tr\u00ED banner / Banner Placement';
    pluralName: 'banner-placements';
    singularName: 'banner-placement';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    banners: Attribute.Relation<
      'api::banner-placement.banner-placement',
      'oneToMany',
      'api::banner.banner'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-placement.banner-placement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::banner-placement.banner-placement',
      'oneToMany',
      'api::banner-placement.banner-placement'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::banner-placement.banner-placement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerBanner extends Schema.CollectionType {
  collectionName: 'banners';
  info: {
    displayName: 'Banner trang ch\u1EE7 / Homepage Banner';
    pluralName: 'banners';
    singularName: 'banner';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    button: Attribute.Component<'shared.button-config'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::banner.banner',
      'oneToMany',
      'api::banner.banner'
    >;
    mobileImage: Attribute.Media<'images'>;
    placement: Attribute.Relation<
      'api::banner.banner',
      'manyToOne',
      'api::banner-placement.banner-placement'
    >;
    priority: Attribute.Integer & Attribute.DefaultTo<0>;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCareerJobCareerJob extends Schema.CollectionType {
  collectionName: 'career_jobs';
  info: {
    displayName: 'Tin tuy\u1EC3n d\u1EE5ng / Career Job';
    pluralName: 'career-jobs';
    singularName: 'career-job';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    applicationDeadline: Attribute.Date;
    applyUrl: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career-job.career-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    department: Attribute.String;
    description: Attribute.RichText;
    employmentType: Attribute.Relation<
      'api::career-job.career-job',
      'manyToOne',
      'api::employment-type.employment-type'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::career-job.career-job',
      'oneToMany',
      'api::career-job.career-job'
    >;
    location: Attribute.String;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    salaryRange: Attribute.String;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    status: Attribute.Enumeration<['open', 'closed']> &
      Attribute.DefaultTo<'open'>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::career-job.career-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactPageSettingContactPageSetting
  extends Schema.SingleType {
  collectionName: 'contact_page_settings';
  info: {
    displayName: 'C\u1EA5u h\u00ECnh trang li\u00EAn h\u1EC7 / Contact Page Setting';
    pluralName: 'contact-page-settings';
    singularName: 'contact-page-setting';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-page-setting.contact-page-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::contact-page-setting.contact-page-setting',
      'oneToMany',
      'api::contact-page-setting.contact-page-setting'
    >;
    mapEmbedUrl: Attribute.String;
    publishedAt: Attribute.DateTime;
    recipientEmail: Attribute.Email;
    seo: Attribute.Component<'shared.seo-meta'>;
    summary: Attribute.Text;
    supportChannels: Attribute.Component<'shared.link-item', true>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact-page-setting.contact-page-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentCategoryDocumentCategory
  extends Schema.CollectionType {
  collectionName: 'document_categories';
  info: {
    displayName: 'Danh m\u1EE5c t\u00E0i li\u1EC7u / Document Category';
    pluralName: 'document-categories';
    singularName: 'document-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document-category.document-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    documents: Attribute.Relation<
      'api::document-category.document-category',
      'oneToMany',
      'api::downloadable-document.downloadable-document'
    >;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::document-category.document-category',
      'oneToMany',
      'api::document-category.document-category'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::document-category.document-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDownloadableDocumentDownloadableDocument
  extends Schema.CollectionType {
  collectionName: 'downloadable_documents';
  info: {
    displayName: 'T\u00E0i li\u1EC7u t\u1EA3i xu\u1ED1ng / Downloadable Document';
    pluralName: 'downloadable-documents';
    singularName: 'downloadable-document';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::downloadable-document.downloadable-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    document: Attribute.Media<'files'>;
    documentCategory: Attribute.Relation<
      'api::downloadable-document.downloadable-document',
      'manyToOne',
      'api::document-category.document-category'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::downloadable-document.downloadable-document',
      'oneToMany',
      'api::downloadable-document.downloadable-document'
    >;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    thumbnail: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::downloadable-document.downloadable-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmploymentTypeEmploymentType extends Schema.CollectionType {
  collectionName: 'employment_types';
  info: {
    displayName: 'Lo\u1EA1i h\u00ECnh tuy\u1EC3n d\u1EE5ng / Employment Type';
    pluralName: 'employment-types';
    singularName: 'employment-type';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employment-type.employment-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    jobs: Attribute.Relation<
      'api::employment-type.employment-type',
      'oneToMany',
      'api::career-job.career-job'
    >;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::employment-type.employment-type',
      'oneToMany',
      'api::employment-type.employment-type'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::employment-type.employment-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventCategoryEventCategory extends Schema.CollectionType {
  collectionName: 'event_categories';
  info: {
    displayName: 'Danh m\u1EE5c s\u1EF1 ki\u1EC7n / Event Category';
    pluralName: 'event-categories';
    singularName: 'event-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event-category.event-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    events: Attribute.Relation<
      'api::event-category.event-category',
      'oneToMany',
      'api::event.event'
    >;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::event-category.event-category',
      'oneToMany',
      'api::event-category.event-category'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::event-category.event-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    displayName: 'S\u1EF1 ki\u1EC7n / Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    category: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::event-category.event-category'
    >;
    content: Attribute.RichText;
    coverImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    endDate: Attribute.DateTime;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    isOnline: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::event.event'
    >;
    location: Attribute.String;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    registrationUrl: Attribute.String;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    startDate: Attribute.DateTime;
    status: Attribute.Enumeration<['upcoming', 'ongoing', 'ended']> &
      Attribute.DefaultTo<'upcoming'>;
    summary: Attribute.Text;
    tags: Attribute.Relation<'api::event.event', 'manyToMany', 'api::tag.tag'>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqCategoryFaqCategory extends Schema.CollectionType {
  collectionName: 'faq_categories';
  info: {
    displayName: 'Danh m\u1EE5c FAQ / FAQ Category';
    pluralName: 'faq-categories';
    singularName: 'faq-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    items: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToMany',
      'api::faq-item.faq-item'
    >;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToMany',
      'api::faq-category.faq-category'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqItemFaqItem extends Schema.CollectionType {
  collectionName: 'faq_items';
  info: {
    displayName: 'C\u00E2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p / FAQ Item';
    pluralName: 'faq-items';
    singularName: 'faq-item';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    answer: Attribute.RichText & Attribute.Required;
    category: Attribute.Relation<
      'api::faq-item.faq-item',
      'manyToOne',
      'api::faq-category.faq-category'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::faq-item.faq-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::faq-item.faq-item',
      'oneToMany',
      'api::faq-item.faq-item'
    >;
    publishedAt: Attribute.DateTime;
    question: Attribute.String & Attribute.Required;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::faq-item.faq-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterNavigationFooterNavigation extends Schema.SingleType {
  collectionName: 'footer_navigations';
  info: {
    displayName: '\u0110i\u1EC1u h\u01B0\u1EDBng ch\u00E2n trang / Footer Navigation';
    pluralName: 'footer-navigations';
    singularName: 'footer-navigation';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    columns: Attribute.Component<'shared.link-item', true>;
    copyrightText: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-navigation.footer-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    legalLinks: Attribute.Component<'shared.link-item', true>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::footer-navigation.footer-navigation',
      'oneToMany',
      'api::footer-navigation.footer-navigation'
    >;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::footer-navigation.footer-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGlobalSettingGlobalSetting extends Schema.SingleType {
  collectionName: 'global_settings';
  info: {
    displayName: 'C\u1EA5u h\u00ECnh chung / Global Setting';
    pluralName: 'global-settings';
    singularName: 'global-setting';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::global-setting.global-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    defaultSeo: Attribute.Component<'shared.seo-meta'>;
    favicon: Attribute.Media<'images'>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::global-setting.global-setting',
      'oneToMany',
      'api::global-setting.global-setting'
    >;
    logo: Attribute.Media<'images'>;
    organizationName: Attribute.String;
    publishedAt: Attribute.DateTime;
    siteDescription: Attribute.Text;
    siteName: Attribute.String & Attribute.Required;
    siteTagline: Attribute.String;
    socialLinks: Attribute.Component<'shared.link-item', true>;
    supportEmail: Attribute.Email;
    supportHotline: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::global-setting.global-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderNavigationHeaderNavigation extends Schema.SingleType {
  collectionName: 'header_navigations';
  info: {
    displayName: '\u0110i\u1EC1u h\u01B0\u1EDBng \u0111\u1EA7u trang / Header Navigation';
    pluralName: 'header-navigations';
    singularName: 'header-navigation';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header-navigation.header-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    items: Attribute.Component<'shared.link-item', true>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::header-navigation.header-navigation',
      'oneToMany',
      'api::header-navigation.header-navigation'
    >;
    primaryButton: Attribute.Component<'shared.button-config'>;
    publishedAt: Attribute.DateTime;
    secondaryButton: Attribute.Component<'shared.button-config'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::header-navigation.header-navigation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomepageHomepage extends Schema.SingleType {
  collectionName: 'homepages';
  info: {
    displayName: 'Trang ch\u1EE7 / Homepage';
    pluralName: 'homepages';
    singularName: 'homepage';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    hero: Attribute.Component<'sections.hero-block'>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::homepage.homepage',
      'oneToMany',
      'api::homepage.homepage'
    >;
    publishedAt: Attribute.DateTime;
    sections: Attribute.DynamicZone<
      [
        'sections.home-one-shinhan-section',
        'sections.home-ai-stack-section',
        'sections.home-ecosystem-section',
        'sections.feature-card-section',
        'sections.trading-system-showcase-section',
        'sections.research-list-section',
        'sections.news-list-section',
        'sections.faq-section',
        'sections.cta-section',
        'sections.office-list-section',
        'sections.trust-signal-section',
        'sections.stats-section'
      ]
    >;
    seo: Attribute.Component<'shared.seo-meta'>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsArticleNewsArticle extends Schema.CollectionType {
  collectionName: 'news_articles';
  info: {
    displayName: 'B\u00E0i tin t\u1EE9c / News Article';
    pluralName: 'news-articles';
    singularName: 'news-article';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    author: Attribute.Relation<
      'api::news-article.news-article',
      'manyToOne',
      'api::author.author'
    >;
    category: Attribute.Relation<
      'api::news-article.news-article',
      'manyToOne',
      'api::news-category.news-category'
    >;
    content: Attribute.RichText & Attribute.Required;
    coverImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::news-article.news-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    documents: Attribute.Relation<
      'api::news-article.news-article',
      'manyToMany',
      'api::downloadable-document.downloadable-document'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::news-article.news-article',
      'oneToMany',
      'api::news-article.news-article'
    >;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    status: Attribute.Enumeration<['draft', 'published', 'archived']> &
      Attribute.DefaultTo<'published'>;
    summary: Attribute.Text;
    tags: Attribute.Relation<
      'api::news-article.news-article',
      'manyToMany',
      'api::tag.tag'
    >;
    thumbnail: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::news-article.news-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsCategoryNewsCategory extends Schema.CollectionType {
  collectionName: 'news_categories';
  info: {
    displayName: 'Danh m\u1EE5c tin t\u1EE9c / News Category';
    pluralName: 'news-categories';
    singularName: 'news-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    articles: Attribute.Relation<
      'api::news-category.news-category',
      'oneToMany',
      'api::news-article.news-article'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::news-category.news-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::news-category.news-category',
      'oneToMany',
      'api::news-category.news-category'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::news-category.news-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOfficeLocationOfficeLocation extends Schema.CollectionType {
  collectionName: 'office_locations';
  info: {
    displayName: '\u0110\u1ECBa \u0111i\u1EC3m v\u0103n ph\u00F2ng / Office Location';
    pluralName: 'office-locations';
    singularName: 'office-location';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address: Attribute.Text & Attribute.Required;
    city: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::office-location.office-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::office-location.office-location',
      'oneToMany',
      'api::office-location.office-location'
    >;
    mapUrl: Attribute.String;
    name: Attribute.String & Attribute.Required;
    officeType: Attribute.Relation<
      'api::office-location.office-location',
      'manyToOne',
      'api::office-type.office-type'
    >;
    phone: Attribute.String;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::office-location.office-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    workingHours: Attribute.String;
  };
}

export interface ApiOfficeTypeOfficeType extends Schema.CollectionType {
  collectionName: 'office_types';
  info: {
    displayName: 'Lo\u1EA1i v\u0103n ph\u00F2ng / Office Type';
    pluralName: 'office-types';
    singularName: 'office-type';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::office-type.office-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::office-type.office-type',
      'oneToMany',
      'api::office-type.office-type'
    >;
    offices: Attribute.Relation<
      'api::office-type.office-type',
      'oneToMany',
      'api::office-location.office-location'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::office-type.office-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPageTypePageType extends Schema.CollectionType {
  collectionName: 'page_types';
  info: {
    displayName: 'Lo\u1EA1i trang / Page Type';
    pluralName: 'page-types';
    singularName: 'page-type';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::page-type.page-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::page-type.page-type',
      'oneToMany',
      'api::page-type.page-type'
    >;
    pages: Attribute.Relation<
      'api::page-type.page-type',
      'oneToMany',
      'api::page.page'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::page-type.page-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    displayName: 'Trang n\u1ED9i dung / Page';
    pluralName: 'pages';
    singularName: 'page';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    breadcrumb: Attribute.Component<'shared.breadcrumb-config'>;
    coverImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::page.page',
      'oneToMany',
      'api::page.page'
    >;
    pageType: Attribute.Relation<
      'api::page.page',
      'manyToOne',
      'api::page-type.page-type'
    >;
    publishedAt: Attribute.DateTime;
    sections: Attribute.DynamicZone<
      [
        'sections.hero-block',
        'sections.rich-text-block',
        'sections.feature-card-section',
        'sections.stats-section',
        'sections.timeline-section',
        'sections.quote-section',
        'sections.cta-section',
        'sections.contact-section',
        'sections.faq-section',
        'sections.download-list-section',
        'sections.table-block',
        'sections.embed-block',
        'sections.office-list-section',
        'sections.related-content-section'
      ]
    >;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiRelatedContentTypeRelatedContentType
  extends Schema.CollectionType {
  collectionName: 'related_content_types';
  info: {
    displayName: 'Lo\u1EA1i n\u1ED9i dung li\u00EAn quan / Related Content Type';
    pluralName: 'related-content-types';
    singularName: 'related-content-type';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::related-content-type.related-content-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::related-content-type.related-content-type',
      'oneToMany',
      'api::related-content-type.related-content-type'
    >;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::related-content-type.related-content-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResearchCategoryResearchCategory
  extends Schema.CollectionType {
  collectionName: 'research_categories';
  info: {
    displayName: 'Danh m\u1EE5c b\u00E1o c\u00E1o / Research Category';
    pluralName: 'research-categories';
    singularName: 'research-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::research-category.research-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::research-category.research-category',
      'oneToMany',
      'api::research-category.research-category'
    >;
    publishedAt: Attribute.DateTime;
    reports: Attribute.Relation<
      'api::research-category.research-category',
      'oneToMany',
      'api::research-report.research-report'
    >;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::research-category.research-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResearchReportTypeResearchReportType
  extends Schema.CollectionType {
  collectionName: 'research_report_types';
  info: {
    displayName: 'Lo\u1EA1i b\u00E1o c\u00E1o / Research Report Type';
    pluralName: 'research-report-types';
    singularName: 'research-report-type';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::research-report-type.research-report-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::research-report-type.research-report-type',
      'oneToMany',
      'api::research-report-type.research-report-type'
    >;
    publishedAt: Attribute.DateTime;
    reports: Attribute.Relation<
      'api::research-report-type.research-report-type',
      'oneToMany',
      'api::research-report.research-report'
    >;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::research-report-type.research-report-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResearchReportResearchReport extends Schema.CollectionType {
  collectionName: 'research_reports';
  info: {
    displayName: 'B\u00E1o c\u00E1o ph\u00E2n t\u00EDch / Research Report';
    pluralName: 'research-reports';
    singularName: 'research-report';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    author: Attribute.Relation<
      'api::research-report.research-report',
      'manyToOne',
      'api::author.author'
    >;
    category: Attribute.Relation<
      'api::research-report.research-report',
      'manyToOne',
      'api::research-category.research-category'
    >;
    content: Attribute.RichText;
    coverImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::research-report.research-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    documents: Attribute.Relation<
      'api::research-report.research-report',
      'manyToMany',
      'api::downloadable-document.downloadable-document'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::research-report.research-report',
      'oneToMany',
      'api::research-report.research-report'
    >;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    reportType: Attribute.Relation<
      'api::research-report.research-report',
      'manyToOne',
      'api::research-report-type.research-report-type'
    >;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Attribute.Text;
    tags: Attribute.Relation<
      'api::research-report.research-report',
      'manyToMany',
      'api::tag.tag'
    >;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::research-report.research-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSeoDefaultSeoDefault extends Schema.SingleType {
  collectionName: 'seo_defaults';
  info: {
    displayName: 'M\u1EB7c \u0111\u1ECBnh SEO / SEO Default';
    pluralName: 'seo-defaults';
    singularName: 'seo-default';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seo-default.seo-default',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    defaultOgImage: Attribute.Media<'images'>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::seo-default.seo-default',
      'oneToMany',
      'api::seo-default.seo-default'
    >;
    meta: Attribute.Component<'shared.seo-meta'>;
    organizationSchema: Attribute.JSON;
    publishedAt: Attribute.DateTime;
    siteUrl: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::seo-default.seo-default',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceCategoryServiceCategory
  extends Schema.CollectionType {
  collectionName: 'service_categories';
  info: {
    displayName: 'Danh m\u1EE5c d\u1ECBch v\u1EE5 / Service Category';
    pluralName: 'service-categories';
    singularName: 'service-category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-category.service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::service-category.service-category',
      'oneToMany',
      'api::service-category.service-category'
    >;
    publishedAt: Attribute.DateTime;
    services: Attribute.Relation<
      'api::service-category.service-category',
      'oneToMany',
      'api::service.service'
    >;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    summary: Attribute.Text;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::service-category.service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    displayName: 'D\u1ECBch v\u1EE5 / Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    advisors: Attribute.Component<'shared.advisor-card', true>;
    advisorSectionBackgroundImage: Attribute.Media<'images'>;
    advisorSectionDescription: Attribute.Text;
    advisorSectionTitle: Attribute.String;
    category: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::service-category.service-category'
    >;
    coverImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    documents: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::downloadable-document.downloadable-document'
    >;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::service.service'
    >;
    publishDate: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'shared.seo-meta'>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sortOrder: Attribute.Integer & Attribute.DefaultTo<0>;
    status: Attribute.Enumeration<['active', 'coming_soon', 'archived']> &
      Attribute.DefaultTo<'active'>;
    summary: Attribute.Text;
    tags: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::tag.tag'
    >;
    thumbnail: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    displayName: 'Th\u1EBB / Tag';
    pluralName: 'tags';
    singularName: 'tag';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.Text;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::tag.tag',
      'oneToMany',
      'api::tag.tag'
    >;
    name: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::announcement.announcement': ApiAnnouncementAnnouncement;
      'api::author.author': ApiAuthorAuthor;
      'api::banner-placement.banner-placement': ApiBannerPlacementBannerPlacement;
      'api::banner.banner': ApiBannerBanner;
      'api::career-job.career-job': ApiCareerJobCareerJob;
      'api::contact-page-setting.contact-page-setting': ApiContactPageSettingContactPageSetting;
      'api::document-category.document-category': ApiDocumentCategoryDocumentCategory;
      'api::downloadable-document.downloadable-document': ApiDownloadableDocumentDownloadableDocument;
      'api::employment-type.employment-type': ApiEmploymentTypeEmploymentType;
      'api::event-category.event-category': ApiEventCategoryEventCategory;
      'api::event.event': ApiEventEvent;
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory;
      'api::faq-item.faq-item': ApiFaqItemFaqItem;
      'api::footer-navigation.footer-navigation': ApiFooterNavigationFooterNavigation;
      'api::global-setting.global-setting': ApiGlobalSettingGlobalSetting;
      'api::header-navigation.header-navigation': ApiHeaderNavigationHeaderNavigation;
      'api::homepage.homepage': ApiHomepageHomepage;
      'api::news-article.news-article': ApiNewsArticleNewsArticle;
      'api::news-category.news-category': ApiNewsCategoryNewsCategory;
      'api::office-location.office-location': ApiOfficeLocationOfficeLocation;
      'api::office-type.office-type': ApiOfficeTypeOfficeType;
      'api::page-type.page-type': ApiPageTypePageType;
      'api::page.page': ApiPagePage;
      'api::related-content-type.related-content-type': ApiRelatedContentTypeRelatedContentType;
      'api::research-category.research-category': ApiResearchCategoryResearchCategory;
      'api::research-report-type.research-report-type': ApiResearchReportTypeResearchReportType;
      'api::research-report.research-report': ApiResearchReportResearchReport;
      'api::seo-default.seo-default': ApiSeoDefaultSeoDefault;
      'api::service-category.service-category': ApiServiceCategoryServiceCategory;
      'api::service.service': ApiServiceService;
      'api::tag.tag': ApiTagTag;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
