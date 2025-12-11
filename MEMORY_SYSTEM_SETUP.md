# Memory Submission System - Setup Guide

## How It Works

### Current Implementation (Before Supabase)
- Memories are stored in browser's **localStorage**
- When you submit a memory on the website, it saves locally
- Admin dashboard reads from localStorage to display memories
- Works instantly without backend!

### With Supabase (Production)
- Memories save to Supabase database
- Real-time sync between website and admin dashboard
- Persistent storage (survives browser refresh)
- Admin can approve/reject memories
- Multiple users see same data

---

## Quick Test (Works Now!)

### On Website
1. Go to http://localhost:8000
2. Scroll down to "Share Your Memory"
3. Fill in Name, Email, Memory
4. Click "Submit Memory"
5. Confirm success message

### In Admin Dashboard
1. Go to http://localhost:8000/admin.html
2. Click "Memories" in sidebar
3. Your submitted memory appears! ✅

---

## Full Supabase Integration (Production)

### Step 1: Create memories table in Supabase

Run this SQL in Supabase:

```sql
CREATE TABLE memories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  memory TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for memories"
  ON memories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read for approved memories"
  ON memories FOR SELECT
  USING (is_approved = true);

CREATE INDEX idx_memories_created_at ON memories(created_at DESC);
```

### Step 2: Update script.js

Replace the memory submission function with:

```javascript
async function submitMemoryToSupabase(name, email, memory) {
    try {
        const { data, error } = await supabase
            .from('memories')
            .insert([
                {
                    name: name,
                    email: email,
                    memory: memory,
                    is_approved: false
                }
            ]);

        if (error) throw error;
        console.log('Memory saved to Supabase:', data);
        return true;
    } catch (error) {
        console.error('Error saving memory:', error);
        return false;
    }
}
```

### Step 3: Update admin-dashboard.js

Replace loadMemories function with:

```javascript
async function loadMemories() {
    const memoriesList = document.getElementById('memoriesList');
    
    try {
        const { data: memories, error } = await supabase
            .from('memories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        memoriesList.innerHTML = memories.length > 0 
            ? memories.map((memory, index) => `
                <div class="item-card">
                    <div class="item-content">
                        <div class="item-title">${memory.name}</div>
                        <div class="item-description">"${memory.memory}"</div>
                        <small style="color: var(--text-muted);">
                            📧 ${memory.email} | 📅 ${new Date(memory.created_at).toLocaleDateString()}
                        </small>
                        <div class="item-actions">
                            <button class="btn-edit" onclick="approveMemory(${memory.id})">✓ Approve</button>
                            <button class="btn-danger" onclick="rejectMemory(${memory.id})">✗ Reject</button>
                        </div>
                    </div>
                </div>
            `).join('')
            : '<p>No memories yet</p>';
    } catch (error) {
        console.error('Error loading memories:', error);
    }
}

async function approveMemory(id) {
    const { error } = await supabase
        .from('memories')
        .update({ is_approved: true })
        .eq('id', id);
    
    if (!error) {
        alert('Memory approved! ✓');
        loadMemories();
    }
}

async function rejectMemory(id) {
    if(confirm('Are you sure?')) {
        const { error } = await supabase
            .from('memories')
            .delete()
            .eq('id', id);
        
        if (!error) {
            alert('Memory rejected.');
            loadMemories();
        }
    }
}
```

### Step 4: Add Supabase client to supabase-config.js

```javascript
// Add this after the config
const { createClient } = supabase;

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
```

### Step 5: Include Supabase JavaScript library

Add this to index.html and admin.html head:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

## Current Status

✅ **Working Now:**
- Memory submission form functional
- localStorage integration ready
- Admin dashboard shows memories
- Approve/Reject buttons ready

⏳ **After Supabase Setup:**
- Real-time database sync
- Persistent storage
- Multi-user support
- Production-ready

---

## Testing Checklist

- [ ] Submit memory on website
- [ ] Check admin dashboard - memory appears
- [ ] Approve memory - works
- [ ] Reject memory - works
- [ ] Refresh page - memory persists
- [ ] Open in different browser - still shows in admin

---

## Files Modified

- ✅ `script.js` - Memory submission logic
- ✅ `admin-dashboard.js` - Memories display & management
- ⏳ `supabase-config.js` - (after Step 4)
- ⏳ `index.html` - (after Step 5)
- ⏳ `admin.html` - (after Step 5)

---

## Production Deployment

After Supabase integration:
1. Update credentials in environment variables
2. Push to GitHub
3. Deploy on Netlify (auto-deploy on push)
4. Test all functionality live

---

**Your memory system is ready to go! 🚀**
