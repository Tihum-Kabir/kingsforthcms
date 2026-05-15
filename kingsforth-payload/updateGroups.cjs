const fs = require('fs');
const path = require('path');

const groups = {
  'COMMAND CENTER': ['Leads.ts', 'TeamMembers.ts', 'FAQs.ts', 'Companies.ts', 'Subscriptions.ts', 'Invoices.ts'],
  'INTELLIGENCE SUITE': ['Analytics.ts', 'KnowledgeBase.ts'],
  'OPERATIONS': ['SupportTickets.ts', 'AuditLogs.ts'],
  'CUSTOMIZE': ['Media.ts', 'Services.ts', 'Solutions.ts', 'Resources.ts']
};

const collectionsDir = path.join(__dirname, 'src', 'collections');

for (const [groupName, files] of Object.entries(groups)) {
  for (const file of files) {
    const filePath = path.join(collectionsDir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      const groupRegex = /group:\s*['"][^'"]+['"]/;
      if (groupRegex.test(content)) {
        content = content.replace(groupRegex, `group: '${groupName}'`);
      } else if (content.includes('admin: {')) {
        content = content.replace(/admin:\s*\{/, `admin: {\n    group: '${groupName}',`);
      } else {
         content = content.replace(/(slug:\s*['"][^'"]+['"],)/, `$1\n  admin: {\n    group: '${groupName}',\n  },`);
      }
      
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + file + ' to group ' + groupName);
    } else {
      console.log('Warning file not found: ' + file);
    }
  }
}
