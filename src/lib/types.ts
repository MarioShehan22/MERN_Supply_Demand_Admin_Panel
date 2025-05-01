export type Guide = {
    _id: string;
    firstName: string;
    lastName: string;
    userId: {
        _id: string;
        email: string;
        role: string;
    };
    profilePhoto: string;
    expertise: string[];
    languages: string[];
    bio: string;
    education: string;
    phoneNumber: string;
    is_active: boolean;
}

export type Booking = {
    _id: string | '';
    tourId: string | '';
    touristId: string | '';
    participantCount: number | null;
    status: string | '';
    bookingDate: Date | '';
    paymentStatus: string | '';
    totalPrice: number | null;
    specialRequests: string | '';
}

export interface Location {
    _id: string;
    locationName: string;
    temperature: number;
    image: string;
    description: string;
    type: string;
    accessibility_info?: string;
    best_visit_time: string;
    facilities?: string;
    is_active: boolean;
    to: string;
}

export type Ratings = {
    email: string | '',
    comment: string | '',
    currentRating: number|0,
    _id: string|'',
}