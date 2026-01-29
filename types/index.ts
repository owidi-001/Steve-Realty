// ============================================
// types/index.ts - TypeScript Types for Steve's Realty API
// ============================================

// ============================================
// COMMON/UTILITY TYPES
// ============================================

export type UUID = string;
export type ISODateString = string;
export type Currency = 'KES' | 'USD';

// ============================================
// USER TYPES
// ============================================

export type UserType = 'buyer' | 'agent' | 'admin';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type LookingFor = 'buy' | 'rent' | 'both' | 'not_looking';
export type ProfileVisibility = 'public' | 'private' | 'agents_only';
export type Language = 'en' | 'sw';

export interface User {
    id: UUID;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number?: string;
    user_type: UserType;
    email_verified: boolean;
    phone_verified: boolean;
    is_verified: boolean;
    is_premium: boolean;
    premium_until?: ISODateString;
    preferred_language: Language;
    currency_preference: Currency;
    receive_email_notifications: boolean;
    receive_sms_notifications: boolean;
    profile: UserProfile;
    date_joined: ISODateString;
    last_login?: ISODateString;
}

export interface UserProfile {
    avatar?: string;
    bio?: string;
    date_of_birth?: string;
    gender?: Gender;
    country: string;
    county?: string;
    city?: string;
    address?: string;
    looking_for: LookingFor;
    budget_min?: number;
    budget_max?: number;
    budget_range?: string;
    preferred_locations: string[];
    preferred_property_types: number[];
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    profile_visibility: ProfileVisibility;
    show_phone: boolean;
    show_email: boolean;
    created_at: ISODateString;
    updated_at: ISODateString;
}

export interface UserRegistration {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    user_type?: UserType;
    preferred_language?: Language;
    profile?: Partial<UserProfile>;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ChangePassword {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
}

export interface FavoriteListing {
    id: number;
    listing: number;
    listing_data: ListingCard;
    notes?: string;
    created_at: ISODateString;
}

export interface SavedSearch {
    id: number;
    name: string;
    search_criteria: Record<string, any>;
    email_alerts: boolean;
    sms_alerts: boolean;
    alert_frequency: 'instant' | 'daily' | 'weekly' | 'never';
    is_active: boolean;
    match_count: number;
    last_checked?: ISODateString;
    created_at: ISODateString;
    updated_at: ISODateString;
}

export type ActivityType =
    | 'view_listing'
    | 'favorite'
    | 'unfavorite'
    | 'search'
    | 'contact_agent'
    | 'phone_reveal'
    | 'inquiry'
    | 'profile_update'
    | 'save_search';

export interface UserActivity {
    id: number;
    activity_type: ActivityType;
    listing?: number;
    metadata: Record<string, any>;
    created_at: ISODateString;
}

export type InquiryType = 'viewing' | 'info' | 'offer' | 'general';
export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';
export type ContactMethod = 'email' | 'phone' | 'whatsapp' | 'any';

export interface Inquiry {
    id: number;
    user?: UUID;
    user_name?: string;
    listing: number;
    listing_data: ListingCard;
    name: string;
    email: string;
    phone: string;
    message: string;
    inquiry_type: InquiryType;
    preferred_contact_method: ContactMethod;
    preferred_viewing_time?: ISODateString;
    status: InquiryStatus;
    agent_response?: string;
    responded_at?: ISODateString;
    created_at: ISODateString;
    updated_at: ISODateString;
}

export type NotificationType =
    | 'new_listing'
    | 'price_drop'
    | 'inquiry_response'
    | 'favorite_update'
    | 'saved_search_match'
    | 'account'
    | 'promotional';

export interface Notification {
    id: number;
    notification_type: NotificationType;
    title: string;
    message: string;
    listing?: number;
    action_url?: string;
    is_read: boolean;
    read_at?: ISODateString;
    created_at: ISODateString;
}

export interface UserStats {
    favorites_count: number;
    saved_searches_count: number;
    inquiries_count: number;
    activities_count: number;
    unread_notifications: number;
}

// ============================================
// LISTING TYPES
// ============================================

export type TransactionType = 'sale' | 'rent' | 'lease' | 'sale_rent';
export type ListingStatus =
    | 'draft'
    | 'pending_review'
    | 'active'
    | 'under_offer'
    | 'sold'
    | 'rented'
    | 'withdrawn'
    | 'expired'
    | 'inactive';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type RentFrequency = 'monthly' | 'quarterly' | 'annually' | 'weekly';

export interface ListingCategory {
    id: number;
    title: string;
    slug: string;
    description?: string;
    icon?: string;
    type_count?: number;
    meta_title?: string;
    meta_description?: string;
    types?: ListingType[];
    created_at: ISODateString;
    updated_at: ISODateString;
}

export interface ListingType {
    id: number;
    title: string;
    slug: string;
    icon?: string;
    category_name?: string;
    listing_count?: number;
    category?: ListingCategory;
    description?: string;
    display_order: number;
    is_active: boolean;
    created_at: ISODateString;
    updated_at: ISODateString;
}

export interface ListingLocation {
    country: string;
    county: string;
    city: string;
    neighborhood?: string;
    street_address?: string;
    postal_code?: string;
    latitude?: number;
    longitude?: number;
    distance_to_cbd?: number;
    nearby_schools?: string;
    nearby_hospitals?: string;
    nearby_shopping?: string;
    public_transport_access?: string;
    area_description?: string;
}

export type KitchenType = 'open' | 'closed' | 'semi_open' | 'none';
export type FurnishingStatus = 'unfurnished' | 'semi_furnished' | 'fully_furnished';

export interface ListingSpecification {
    bedrooms?: number;
    bathrooms?: number;
    interior_size?: number;
    land_area?: number;
    land_area_acres?: number;
    year_built?: number;
    year_renovated?: number;
    floors?: number;
    floor_number?: number;
    parking_spaces: number;
    covered_parking: number;
    living_rooms?: number;
    dining_rooms?: number;
    studies?: number;
    storage_rooms?: number;
    balconies?: number;
    kitchen_type?: KitchenType;
    has_elevator: boolean;
    has_generator: boolean;
    has_borehole: boolean;
    has_solar: boolean;
    has_cctv: boolean;
    has_alarm_system: boolean;
    has_electric_fence: boolean;
    gated_community: boolean;
    security_guards: boolean;
    furnishing_status: FurnishingStatus;
    additional_features?: Record<string, any>;
}

export type AmenityCategory =
    | 'security'
    | 'recreation'
    | 'utilities'
    | 'services'
    | 'outdoor'
    | 'technology'
    | 'other';

export interface ListingAmenity {
    id: number;
    name: string;
    slug: string;
    category: AmenityCategory;
    icon?: string;
    description?: string;
    notes?: string;
}

export type ImageType =
    | 'exterior'
    | 'interior'
    | 'kitchen'
    | 'bathroom'
    | 'bedroom'
    | 'amenity'
    | 'view'
    | 'other';

export interface ListingImage {
    id: number;
    image: string;
    thumbnail?: string;
    caption?: string;
    alt_text?: string;
    image_type: ImageType;
    display_order: number;
    is_primary: boolean;
    uploaded_at: ISODateString;
}

export type DocumentType =
    | 'title_deed'
    | 'survey_plan'
    | 'approval_letter'
    | 'valuation'
    | 'nca_approval'
    | 'occupancy_cert'
    | 'lease_agreement'
    | 'other';

export interface ListingDocument {
    id: number;
    document_type: DocumentType;
    title: string;
    file: string;
    description?: string;
    is_public: boolean;
    uploaded_by_name?: string;
    uploaded_at: ISODateString;
}

export interface ListingPriceHistory {
    id: number;
    old_price: number;
    new_price: number;
    price_change: {
        amount: number;
        percentage: number;
        direction: 'increase' | 'decrease';
    };
    change_reason?: string;
    changed_by_name?: string;
    changed_at: ISODateString;
}

// Card view - minimal data for grids
export interface ListingCard {
    id: UUID;
    reference_number: string;
    title: string;
    slug: string;
    short_description?: string;
    type: string;
    category: string;
    transaction_type: TransactionType;
    price_amount: number;
    price_currency: Currency;
    price_display: string;
    primary_image?: {
        url: string;
        thumbnail: string;
        caption?: string;
    };
    location_summary: string;
    bedrooms?: number;
    bathrooms?: number;
    interior_size?: number;
    is_featured: boolean;
    is_hot_deal: boolean;
    is_new_listing: boolean;
    is_exclusive: boolean;
    view_count: number;
    favorite_count: number;
    created_at: ISODateString;
}

// List view - standard listing data
export interface ListingList extends ListingCard {
    type_details: ListingType;
    agent_name?: string;
    office_name?: string;
    location: ListingLocation;
    specifications: ListingSpecification;
    amenities: ListingAmenity[];
    tags: string[];
    status: ListingStatus;
    verification_status: VerificationStatus;
    inquiry_count: number;
    updated_at: ISODateString;
}

// Detail view - full listing data
export interface ListingDetail extends ListingList {
    description: string;
    rent_frequency?: RentFrequency;
    negotiable: boolean;
    original_price?: number;
    service_charge?: number;
    verified_at?: ISODateString;
    published_at?: ISODateString;
    expires_at?: ISODateString;
    sold_rented_at?: ISODateString;
    priority_score: number;
    virtual_tour_url?: string;
    video_url?: string;
    floor_plan_url?: string;
    unique_view_count: number;
    phone_reveal_count: number;
    share_count: number;
    last_viewed_at?: ISODateString;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    agent?: {
        id: UUID;
        name: string;
        email: string;
        phone: string;
        photo?: string;
        bio?: string;
    };
    office?: {
        id: UUID;
        name: string;
        phone: string;
        email: string;
        address: string;
    };
    images: ListingImage[];
    documents: ListingDocument[];
    price_history: ListingPriceHistory[];
    similar_listings: ListingCard[];
}

export interface ListingCreate {
    listing_type: number;
    title: string;
    slug?: string;
    description: string;
    short_description?: string;
    transaction_type: TransactionType;
    price_amount: number;
    price_currency?: Currency;
    rent_frequency?: RentFrequency;
    negotiable?: boolean;
    service_charge?: number;
    status?: ListingStatus;
    expires_at?: ISODateString;
    is_featured?: boolean;
    is_hot_deal?: boolean;
    is_new_listing?: boolean;
    is_exclusive?: boolean;
    priority_score?: number;
    virtual_tour_url?: string;
    video_url?: string;
    floor_plan_url?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    is_published?: boolean;
    allow_inquiries?: boolean;
    show_address?: boolean;
    show_agent_info?: boolean;
    location?: ListingLocation;
    specifications?: Partial<ListingSpecification>;
    amenity_ids?: number[];
    images?: File[];
    image_data?: Array<{
        caption?: string;
        image_type?: ImageType;
        is_primary?: boolean;
        display_order?: number;
    }>;
    agent?: UUID;
    office?: UUID;
}

export interface SearchFilters {
    q?: string;
    listing_type?: number;
    category?: number;
    transaction_type?: TransactionType;
    county?: string;
    city?: string;
    neighborhood?: string;
    bedrooms_min?: number;
    bedrooms_max?: number;
    bathrooms_min?: number;
    bathrooms_max?: number;
    price_min?: number;
    price_max?: number;
    size_min?: number;
    size_max?: number;
    is_featured?: boolean;
    is_hot_deal?: boolean;
    is_new_listing?: boolean;
    is_exclusive?: boolean;
    status?: ListingStatus;
    verification_status?: VerificationStatus;
    amenities?: number[];
    ordering?:
    | 'price_asc'
    | 'price_desc'
    | 'date_asc'
    | 'date_desc'
    | 'views_desc'
    | 'popular'
    | 'featured'
    | 'newest';
    page?: number;
    page_size?: number;
}

export interface PopularLocation {
    location: string;
    county: string;
    city: string;
    neighborhood?: string;
    listing_count: number;
    avg_price: number;
    sample_listings: ListingCard[];
}

export interface Recommendation {
    property_type: ListingType;
    listings: ListingCard[];
    total_count: number;
}

export interface ListingStats {
    total_listings: number;
    active_listings: number;
    sold_listings: number;
    rented_listings: number;
    featured_listings: number;
    avg_price: number;
    total_views: number;
    total_inquiries: number;
}

// ============================================
// AGENT & OFFICE TYPES
// ============================================

export type OfficeType = 'headquarters' | 'branch' | 'franchise' | 'independent';
export type AgentType = 'internal' | 'external';
export type PaymentStatus = 'good_standing' | 'pending_payment' | 'overdue' | 'suspended';
export type TransactionTypeReview = 'bought' | 'rented' | 'sold' | 'listed';

export interface Office {
    id: UUID;
    name: string;
    slug: string;
    registration_number: string;
    email: string;
    phone: string;
    alternative_phone?: string;
    website?: string;
    address: string;
    county: string;
    city: string;
    postal_code?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    logo?: string;
    cover_image?: string;
    office_type: OfficeType;
    parent_office?: UUID;
    operating_hours?: Record<string, string>;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    is_active: boolean;
    is_verified: boolean;
    verified_at?: ISODateString;
    total_agents: number;
    active_listings: number;
    total_sales: number;
    created_at: ISODateString;
    updated_at: ISODateString;
}

export interface OfficeList {
    id: UUID;
    name: string;
    slug: string;
    logo?: string;
    location: string;
    phone: string;
    email: string;
    is_verified: boolean;
    total_agents: number;
    active_listings: number;
}

export interface Agent {
    id: UUID;
    name: string;
    email: string;
    phone: string;
    alternative_phone?: string;
    whatsapp_number?: string;
    photo?: string;
    bio?: string;
    agent_type: AgentType;
    office?: OfficeList;
    license_number?: string;
    specialization?: string;
    years_of_experience: number;
    service_areas: string[];
    languages: string[];
    is_verified: boolean;
    is_featured: boolean;
    payment_status?: PaymentStatus;
    total_listings: number;
    active_listings: number;
    sold_properties: number;
    rented_properties: number;
    average_rating: number;
    total_reviews: number;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    achievements?: AgentAchievement[];
    recent_reviews?: AgentReview[];
    listings?: ListingCard[];
    created_at: ISODateString;
}

export interface AgentList {
    id: UUID;
    name: string;
    email: string;
    photo?: string;
    phone: string;
    agent_type: AgentType;
    office_name?: string;
    specialization?: string;
    years_of_experience: number;
    is_verified: boolean;
    is_featured: boolean;
    average_rating: number;
    total_reviews: number;
    active_listings: number;
}

export type AchievementType =
    | 'sales_milestone'
    | 'reviews'
    | 'tenure'
    | 'certification'
    | 'award';
export type BadgeColor = 'gold' | 'silver' | 'bronze' | 'blue' | 'green';

export interface AgentAchievement {
    id: number;
    achievement_type: AchievementType;
    title: string;
    description: string;
    icon?: string;
    badge_color: BadgeColor;
    achieved_at: ISODateString;
    is_visible: boolean;
}

export interface AgentReview {
    id: number;
    reviewer_name: string;
    rating: number;
    title: string;
    review: string;
    professionalism?: number;
    responsiveness?: number;
    knowledge?: number;
    transaction_type?: TransactionTypeReview;
    agent_response?: string;
    responded_at?: ISODateString;
    created_at: ISODateString;
}

export interface AdvertisingPackage {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: Currency;
    free_period_days: number;
    total_duration_days: number;
    is_featured: boolean;
    priority_boost: number;
    max_images: number;
    virtual_tour_allowed: boolean;
    video_allowed: boolean;
    homepage_placement: boolean;
    social_media_promotion: boolean;
    is_popular: boolean;
    features: string[];
}

export type PaymentStatusType = 'pending' | 'paid' | 'overdue' | 'waived' | 'refunded';
export type PaymentMethod = 'mpesa' | 'bank_transfer' | 'card' | 'cash';

export interface ListingPayment {
    id: UUID;
    listing: number;
    listing_title: string;
    agent_name: string;
    amount: number;
    currency: Currency;
    listing_posted_at: ISODateString;
    free_period_ends_at: ISODateString;
    payment_due_date: ISODateString;
    status: PaymentStatusType;
    payment_method?: PaymentMethod;
    payment_reference?: string;
    paid_at?: ISODateString;
    is_overdue: boolean;
    days_overdue: number;
    notes?: string;
    created_at: ISODateString;
}

export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'disputed';

export interface Commission {
    id: number;
    agent_name: string;
    listing: number;
    listing_title: string;
    sale_price: number;
    commission_rate: number;
    commission_amount: number;
    currency: Currency;
    status: CommissionStatus;
    paid_at?: ISODateString;
    payment_reference?: string;
    notes?: string;
    created_at: ISODateString;
}

export interface AgentStats {
    total_listings: number;
    active_listings: number;
    sold_properties: number;
    rented_properties: number;
    total_revenue: number;
    pending_commissions: number;
    average_rating: number;
    total_reviews: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
    count: number;
    next?: string;
    previous?: string;
    page: number;
    total_pages: number;
    page_size: number;
    results: T[];
}

export interface ApiError {
    detail?: string;
    error?: string;
    [key: string]: any;
}

// ============================================
// FORM TYPES (for React Hook Form, Formik, etc.)
// ============================================

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    user_type?: UserType;
}

export interface ProfileUpdateForm {
    first_name: string;
    last_name: string;
    phone_number?: string;
    preferred_language: Language;
    currency_preference: Currency;
    receive_email_notifications: boolean;
    receive_sms_notifications: boolean;
    profile?: Partial<UserProfile>;
}

export interface InquiryForm {
    listing: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    inquiry_type: InquiryType;
    preferred_contact_method: ContactMethod;
    preferred_viewing_time?: string;
}

export interface ReviewForm {
    rating: number;
    title: string;
    review: string;
    professionalism?: number;
    responsiveness?: number;
    knowledge?: number;
    transaction_type?: TransactionTypeReview;
}

// ============================================
// UTILITY FUNCTIONS (Type Guards)
// ============================================

export const isListingCard = (listing: any): listing is ListingCard => {
    return listing && typeof listing.id === 'string' && 'reference_number' in listing;
};

export const isAgent = (user: any): user is Agent => {
    return user && 'agent_type' in user;
};

export const isOffice = (entity: any): entity is Office => {
    return entity && 'office_type' in entity && 'registration_number' in entity;
};

// ============================================
// CONSTANTS
// ============================================

export const USER_TYPES: UserType[] = ['buyer', 'agent', 'admin'];
export const TRANSACTION_TYPES: TransactionType[] = ['sale', 'rent', 'lease', 'sale_rent'];
export const LISTING_STATUSES: ListingStatus[] = [
    'draft',
    'pending_review',
    'active',
    'under_offer',
    'sold',
    'rented',
    'withdrawn',
    'expired',
    'inactive',
];

export const CURRENCIES: Currency[] = ['KES', 'USD'];
export const LANGUAGES: Language[] = ['en', 'sw'];

// ============================================
// API ENDPOINTS (for reference)
// ============================================

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/api/users/login/',
    REGISTER: '/api/users/',
    LOGOUT: '/api/users/logout/',
    ME: '/api/users/me/',
    CHANGE_PASSWORD: '/api/users/change_password/',

    // Users
    USERS: '/api/users/',
    USER_FAVORITES: '/api/users/favorites/',
    USER_SAVED_SEARCHES: '/api/users/saved_searches/',
    USER_INQUIRIES: '/api/users/inquiries/',
    USER_NOTIFICATIONS: '/api/users/notifications/',
    USER_ACTIVITIES: '/api/users/activities/',
    USER_STATS: '/api/users/stats/',

    // Listings
    LISTINGS: '/api/listings/listings/',
    LISTING_SEARCH: '/api/listings/listings/search/',
    LISTING_RECOMMENDATIONS: '/api/listings/listings/recommendations/',
    POPULAR_LOCATIONS: '/api/listings/listings/popular_locations/',
    LISTING_STATS: '/api/listings/listings/stats/',
    CATEGORIES: '/api/listings/categories/',
    TYPES: '/api/listings/types/',
    AMENITIES: '/api/listings/amenities/',

    // Favorites
    FAVORITES: '/api/favorites/',
    CHECK_FAVORITE: '/api/favorites/check/',

    // Saved Searches
    SAVED_SEARCHES: '/api/saved-searches/',

    // Inquiries
    INQUIRIES: '/api/inquiries/',

    // Agents
    AGENTS: '/api/agents/agents/',
    AGENT_REVIEWS: (id: UUID) => `/api/agents/agents/${id}/reviews/`,
    AGENT_SUBMIT_REVIEW: (id: UUID) => `/api/agents/agents/${id}/submit_review/`,
    AGENT_LISTINGS: (id: UUID) => `/api/agents/agents/${id}/listings/`,
    AGENT_STATS: (id: UUID) => `/api/agents/agents/${id}/stats/`,

    // Offices
    OFFICES: '/api/agents/offices/',
    OFFICE_AGENTS: (slug: string) => `/api/agents/offices/${slug}/agents/`,
    OFFICE_LISTINGS: (slug: string) => `/api/agents/offices/${slug}/listings/`,

    // Packages & Payments
    PACKAGES: '/api/agents/packages/',
    PAYMENTS: '/api/agents/payments/',
    MY_PAYMENTS: '/api/agents/payments/my_payments/',
    MAKE_PAYMENT: (id: UUID) => `/api/agents/payments/${id}/make_payment/`,

    // Commissions
    COMMISSIONS: '/api/agents/commissions/',
    MY_COMMISSIONS: '/api/agents/commissions/my_commissions/',
} as const;

export default API_ENDPOINTS;