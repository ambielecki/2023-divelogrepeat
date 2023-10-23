export function createDiveLog(api_data) {
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