export default function rendererSettings() {
    return {
        site_col: 'site_name',
        id_col: 'subjectnameoridentifier',
        id_status_col: 'status',
        visit_col: 'visit_name',
        visit_order_col: 'Visit_number',
        visit_status_col: 'visit_status',
        visit_status_order_col: 'status_order',
        visit_text_col: 'description',
        visit_text_color_col: 'description_color',
        date_format: '%d-%b-%y',
        pagination: false,
        exports: ['xlsx', 'csv']
    };
}
