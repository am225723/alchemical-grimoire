#!/usr/bin/env python3

import re

def update_navigation():
    # Read the current file
    with open('src/components/EnhancedNavigation.tsx', 'r') as f:
        content = f.read()
    
    # Find and extract AI navigation items
    ai_nav_pattern = r'const aiNavigation: NavigationItem\[\] = \[(.*?)\];'
    ai_nav_match = re.search(ai_nav_pattern, content, re.DOTALL)
    
    if not ai_nav_match:
        print("AI Navigation not found")
        return
    
    ai_nav_content = ai_nav_match.group(1)
    
    # Extract children from AI-Powered Activities
    ai_activities_pattern = r"name: 'AI-Powered Activities'.*?children: \[(.*?)\]"
    ai_activities_match = re.search(ai_activities_pattern, ai_nav_content, re.DOTALL)
    
    # Extract children from Advanced Features
    advanced_features_pattern = r"name: 'Advanced Features'.*?children: \[(.*?)\]"
    advanced_features_match = re.search(advanced_features_pattern, ai_nav_content, re.DOTALL)
    
    # Combine all children
    all_children = []
    if ai_activities_match:
        all_children.append(ai_activities_match.group(1))
    if advanced_features_match:
        all_children.append(advanced_features_match.group(1))
    
    combined_children = ',\n'.join(all_children)
    
    # Update the Toolkit section
    toolkit_pattern = r"(\{[^}]*name: 'Toolkit'[^}]*description: 'AI-powered tools and exercises'[^}]*\})"
    
    def replace_toolkit(match):
        toolkit_item = match.group(1)
        # Remove the closing brace and comma
        toolkit_item = toolkit_item.rstrip().rstrip('}').rstrip(',').rstrip()
        # Add children and close the object
        return toolkit_item + ',\n         isNew: true,\n         badge: \'AI\',\n         children: [\n' + combined_children + '\n         ]\n       },'
    
    content = re.sub(toolkit_pattern, replace_toolkit, content, re.DOTALL)
    
    # Remove the AI-Enhanced section
    ai_section_pattern = r'\n               /\* AI-Enhanced Features \*/\n               <div>\n.*?{aiNavigation\.map\(\(item\) => renderNavigationItem\(item\)\)}\n                </nav>\n              </div>'
    content = re.sub(ai_section_pattern, '', content, re.DOTALL)
    
    # Remove the aiNavigation declaration
    content = re.sub(r'\n    const aiNavigation: NavigationItem\[\] = \[.*?\];', '', content, re.DOTALL)
    
    # Write the updated content back
    with open('src/components/EnhancedNavigation.tsx', 'w') as f:
        f.write(content)
    
    print("Navigation updated successfully!")

if __name__ == "__main__":
    update_navigation()