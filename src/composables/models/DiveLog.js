import validationProvider from "@/providers/ValidationProvider";

export const diveLog = () => {
    function createDiveLog(api_data) {
        return {
            id: api_data.id ?? null,
            dive_number: api_data.dive_number ?? null,
            location: api_data.location ?? '',
            dive_site: api_data.dive_site ?? '',
            date_time: api_data.date_time ?? '',
            buddy: api_data.buddy ?? '',
            max_depth_ft: api_data.max_depth_ft ?? null,
            bottom_time_min: api_data.bottom_time_min ?? null,
            surface_interval_min: api_data.surface_interval_min ?? null,
            used_computer: api_data.used_computer ?? 0,
            description: api_data.description ?? '',
            notes: api_data.notes ?? '',
            dive_details: {
                dive_type: api_data.dive_details?.dive_type ?? null,
                air_temperature: api_data.dive_details?.air_temperature ?? null,
                weather: api_data.dive_details?.weather ?? null,
                surface_conditions: api_data.dive_details?.surface_conditions ?? null,
                visibility: api_data.dive_details?.visibility ?? null,
                water_temperature: api_data.dive_details?.water_temperature ?? null,
            },
            equipment_details: {
                exposure_suit: api_data.equipment_details?.exposure_suit ?? null,
                weight: api_data.equipment_details?.weight ?? null,
            },
        }
    }

    function validateDiveLog(dive_log) {
        const errors = {
            has_errors: false,
            dive_number: [],
            dive_location: [],
            dive_site: [],
            buddy: [],
            date_time: [],
            max_depth_ft: [],
            bottom_time_min: [],
            surface_interval_min: [],
            notes: [],
            description: [],
        };

        if (!validationProvider.validateNotBlank(dive_log.dive_number)
            || !validationProvider.validateNumeric(dive_log.dive_number)) {
            errors.has_errors = true;
            errors.dive_number.push('Dive number cannot be blank and must be numeric');
        }

        if (!validationProvider.validateNotBlank(dive_log.location)
            || !validationProvider.validateMaxLength(dive_log.location, 255)) {
            errors.has_errors = true;
            errors.dive_location.push('Dive location cannot be blank and must be less than 255 characters');
        }

        if (!validationProvider.validateNotBlank(dive_log.dive_site)
            || !validationProvider.validateMaxLength(dive_log.dive_site, 255)) {
            errors.has_errors = true;
            errors.dive_site.push('Dive site cannot be blank and must be less than 255 characters');
        }

        if (!validationProvider.validateMaxLength(dive_log.buddy, 255)) {
            errors.has_errors = true;
            errors.buddy.push('Buddy cannot exceed 255 characters');
        }

        if (!validationProvider.validateNotBlank(dive_log.dive_site)
            || !validationProvider.validateIsDate(dive_log.date_time)) {
            errors.has_errors = true;
            errors.date_time.push('Date is required');
        }

        if (!validationProvider.validateNotBlank(dive_log.max_depth_ft)
            || !validationProvider.validateNumeric(dive_log.max_depth_ft)) {
            errors.has_errors = true;
            errors.max_depth_ft.push('Max Depth cannot be blank and must be numeric');
        }

        if (!validationProvider.validateNotBlank(dive_log.bottom_time_min)
            || !validationProvider.validateNumeric(dive_log.bottom_time_min)) {
            errors.has_errors = true;
            errors.bottom_time_min.push('Bottom time cannot be blank and must be numeric');
        }

        if (!validationProvider.validateNumeric(dive_log.surface_interval_min)) {
            errors.has_errors = true;
            errors.surface_interval_min.push('Surface Interval must be numeric');
        }

        if (!validationProvider.validateMaxLength(dive_log.notes, 2000)) {
            errors.has_errors = true;
            errors.buddy.push('Notes cannot exceed 255 characters');
        }

        if (!validationProvider.validateMaxLength(dive_log.description, 2000)) {
            errors.has_errors = true;
            errors.buddy.push('Description cannot exceed 255 characters');
        }

        return errors;
    }

    return {createDiveLog, validateDiveLog}
}