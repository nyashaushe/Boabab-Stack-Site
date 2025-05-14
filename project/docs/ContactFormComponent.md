# Contact Form Component for Homepage

## Overview

This document outlines the implementation of a contact form component for the Baobab Stack homepage. The contact form will enhance user engagement by providing a direct communication channel for inquiries, feedback, and service requests.

## Component Design

### `ContactForm` Component

#### Visual Design
- Clean, minimalist design consistent with the Baobab Stack brand
- Responsive layout that works on all device sizes
- Subtle animations for form interactions using Framer Motion
- Visual feedback for form validation states
- Success/error message displays

#### Form Fields
- Name (required)
- Email (required with validation)
- Phone number (optional)
- Company/Organization (optional)
- Subject dropdown (required)
  - General Inquiry
  - Service Request
  - Partnership Opportunity
  - Technical Support
  - Other
- Message text area (required)
- Checkbox for newsletter subscription (optional)
- Privacy policy agreement checkbox (required)
- Submit button with loading state

### Integration with Homepage

#### Placement Options
1. **Dedicated Section**
   - Full-width section below the main hero area
   - Two-column layout with form on one side and contact information on the other

2. **Modal Dialog**
   - Triggered by "Contact Us" or "Get in Touch" buttons throughout the site
   - Overlay with form that appears without page navigation

3. **Tab in Multi-purpose Section**
   - Part of a tabbed interface that also includes newsletter signup and other engagement options

## Functionality

### Client-side Features
- Real-time form validation
- Field formatting assistance (phone numbers, email)
- Form state persistence (in case of accidental navigation)
- Submission throttling to prevent spam
- Accessibility features (keyboard navigation, screen reader support)
- Mobile-optimized input handling

### Server-side Integration

#### Strapi Integration
- Create `ContactSubmission` content type in Strapi with fields matching the form
- Set up permissions for creating submissions without authentication
- Implement webhook triggers for new submissions

#### Email Notification System
- Send automated email notifications to administrators for new submissions
- Send confirmation emails to users who submit the form
- Template system for email content

## Implementation

### Component Structure
```typescript
// ContactForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { submitContactForm } from '../services/api/contact';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  subscribeToNewsletter: boolean;
  agreeToPrivacyPolicy: boolean;
}

const ContactForm: React.FC = () => {
  // Implementation details...
};

export default ContactForm;
```

### API Service
```typescript
// services/api/contact.ts
import axios from 'axios';
import { API_URL } from '../config';

export interface ContactFormData {
  // Form data interface
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await axios.post(`${API_URL}/contact-submissions`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Redux Integration
```typescript
// store/slices/contactSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitContactForm, ContactFormData } from '../../services/api/contact';

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const response = await submitContactForm(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetContactForm: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk states
  },
});

export const { resetContactForm } = contactSlice.actions;
export default contactSlice.reducer;
```

## Strapi Configuration

### Content Type Definition
```javascript
// Strapi - ContactSubmission.js
module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'email',
      required: true,
    },
    phone: {
      type: 'string',
    },
    company: {
      type: 'string',
    },
    subject: {
      type: 'enumeration',
      enum: [
        'General Inquiry',
        'Service Request',
        'Partnership Opportunity',
        'Technical Support',
        'Other',
      ],
      required: true,
    },
    message: {
      type: 'text',
      required: true,
    },
    subscribeToNewsletter: {
      type: 'boolean',
      default: false,
    },
    status: {
      type: 'enumeration',
      enum: ['new', 'in-progress', 'completed'],
      default: 'new',
    },
  },
};
```

## Testing Strategy

### Unit Tests
- Validate form submission logic
- Test validation rules
- Verify state management

### Integration Tests
- Test form submission flow
- Verify API integration
- Test error handling

### E2E Tests
- Complete form submission workflow
- Test across different browsers and devices

## Accessibility Considerations

- Ensure all form fields have proper labels
- Implement ARIA attributes for screen readers
- Provide clear error messages
- Ensure keyboard navigation works correctly
- Test with screen readers and other assistive technologies

## Performance Optimization

- Lazy load the contact form component
- Optimize validation to minimize re-renders
- Implement debouncing for real-time validation
- Optimize form submission process

## Integration with Frontend Development Plan

The Contact Form component will be developed alongside the other components outlined in the Frontend Development Plan. It will share the same design system, state management approach, and API integration patterns.

### Timeline Integration

- **Week 1-2**: Develop the Contact Form component alongside other core UI components
- **Week 3-4**: Integrate with Strapi backend
- **Week 11-12**: Include in testing and optimization phases

## Next Steps

1. Create UI mockups for the contact form
2. Set up the Strapi content type for contact submissions
3. Implement the React component
4. Integrate with Redux state management
5. Set up email notification system
6. Test and optimize the component