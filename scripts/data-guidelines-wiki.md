The Participant Visit Listing accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The collection of displays visualizes clinical schedule of events data with **one row per participant per visit** plus the required variables specified below.

## Data structure
one record per participant per visit

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site_name|string|site|**Y**|
|**id_col**|subjectnameoridentifier|string|participant ID|**Y**|
|**id_status_col**|subject_status|string|participant status|**Y**|
|**visit_col**|visit_name|string|visit|**Y**|
|**visit_order_col**|visit_number|string|sort order of visit||
|**visit_date_col**|visit_date|string|date of visit|**Y**|
|**visit_day_col**|visit_day|string|study day of visit|**Y**|
|**visit_status_col**|visit_status|string|status of visit|**Y**|
|**visit_status_order_col**|visit_status_order|string|sort order of visit status||
|**visit_text_col**|visit_text|string|text to be printed in listing cells||
|**visit_text_color_col**|visit_text_color|string|desired color of visit status||
|**visit_status_description_col**|visit_status_description|string|a more detailed description of the visit status||
|**visit_status_exclusion_col**|plot_exclude|string|identifies visit statuses to exclude from visit status legend||
|**filter_cols[0]**|subset1|array|Analysis Subset 1||
|**filter_cols[1]**|subset2|array|Analysis Subset 2||
|**filter_cols[2]**|subset3|array|Analysis Subset 3||
|**filter_cols[3]**|overdue2|array|>1 Overdue Visits||