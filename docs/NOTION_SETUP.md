# Notion Coffee Database Setup

This guide will help you set up the Notion integration for tracking your coffee discoveries.

## 1. Create a Notion Integration

1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "Create new integration"
3. Give it a name (e.g., "Coffee Tracker")
4. Select your workspace
5. Copy the "Internal Integration Token" - this is your `NOTION_TOKEN`

## 2. Create a Coffee Database

Create a new database in Notion with the following properties:

### Required Properties:

- **Name** (Title) - The coffee name
- **Roaster** (Rich Text) - The roaster/brand
- **Date** (Date) - When you tried/bought it
- **Notes** (Rich Text) - Your tasting notes

### Optional Properties:

- **Rating** (Number) - Your rating out of 10
- **Origin** (Rich Text) - Coffee origin/region
- **Process** (Rich Text) - Processing method (washed, natural, etc.)
- **Status** (Select) - Options: "currently_drinking", "completed", "wishlist"

## 3. Share Database with Integration ⚠️ **CRITICAL STEP**

**This is the most commonly missed step!**

1. Open your coffee database in Notion
2. Click the "..." menu (three dots) in the top right corner of the database
3. Click "Add connections" or "Connect to"
4. Search for and select your integration by name
5. Click "Confirm" or "Allow access"

**⚠️ If you skip this step, you'll get "object_not_found" errors even with correct credentials!**

## 4. Get Database ID

1. Open your database in Notion
2. Copy the URL - it looks like: `https://notion.so/workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the long string between the last `/` and `?v=`
4. This is your `NOTION_COFFEE_DATABASE_ID`

## 5. Environment Variables

Create a `.env.local` file in your project root with:

```env
NOTION_TOKEN=your_integration_token_here
NOTION_COFFEE_DATABASE_ID=your_database_id_here
```

## 6. Database Schema Example

Here's what your Notion database should look like:

| Name                  | Roaster     | Date       | Notes                               | Rating | Origin   | Process | Status             |
| --------------------- | ----------- | ---------- | ----------------------------------- | ------ | -------- | ------- | ------------------ |
| Ethiopian Yirgacheffe | Blue Bottle | 2024-01-15 | Bright and floral with citrus notes | 8      | Ethiopia | Washed  | currently_drinking |
| Colombian Huila       | Stumptown   | 2024-01-10 | Rich chocolate and caramel flavors  | 9      | Colombia | Natural | completed          |

## 7. Testing

Once set up, your website will:

- Display "currently_drinking" coffees in the Coffee Discovery section
- Show all entries in the Coffee Archive page
- Fall back to static data if Notion is unavailable
- Allow searching by all fields

## Troubleshooting

### Common Errors:

**"object_not_found" error:**
- ❌ **Most likely cause**: Database not shared with integration
- ✅ **Solution**: Follow step 3 above to share your database with the integration

**"invalid_request_url" error:**
- ❌ **Cause**: Missing or invalid Notion token
- ✅ **Solution**: Check your `.env.local` file has the correct `NOTION_TOKEN`

**"Invalid database ID" error:**
- ❌ **Cause**: Wrong database ID format
- ✅ **Solution**: Make sure you copied the database ID correctly (32 characters, no dashes)

**"validation_error" - property type mismatch:**
- ❌ **Cause**: Status property is not a "Select" type in your database
- ✅ **Solution**: Change your Status property to a Select type with options: "currently_drinking", "completed", "wishlist"
- ℹ️ **Note**: The app will still work with other property types, but filtering may be less precise

### General Checks:
- Make sure your integration has access to the database
- Check that property names match exactly (case-sensitive)
- Verify your environment variables are loaded correctly
- Restart your development server after changing `.env.local`
- Check the browser console for any API errors
