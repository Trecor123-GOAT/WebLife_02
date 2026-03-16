// Relationships system - handles NPCs and social interactions

class RelationshipSystem {
    constructor() {
        this.npcNames = {
            male: [
                'James', 'Michael', 'Robert', 'John', 'David', 'Richard', 'Joseph', 'Thomas',
                'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald',
                'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'Edward',
                'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary'
            ],
            female: [
                'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica',
                'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley',
                'Kimberly', 'Emily', 'Donna', 'Michelle', 'Dorothy', 'Carol', 'Amanda', 'Melissa',
                'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia'
            ]
        };
        
        this.lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
            'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
            'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
            'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
        ];
        
        this.npcs = [];
        this.generateNPCs(50); // Create 50 NPCs
    }
    
    // Generate random NPCs
    generateNPCs(count) {
        for (let i = 0; i < count; i++) {
            const gender = getRandomItem(['male', 'female']);
            const firstName = getRandomItem(this.npcNames[gender]);
            const lastName = getRandomItem(this.lastNames);
            
            this.npcs.push({
                id: generateId(),
                name: `${firstName} ${lastName}`,
                gender: gender,
                age: randomInt(18, 70),
                attractiveness: randomInt(30, 90),
                charisma: randomInt(30, 90),
                personality: getRandomItem(['friendly', 'serious', 'funny', 'shy', 'arrogant', 'kind']),
                job: getRandomItem(['Teacher', 'Doctor', 'Artist', 'Engineer', 'Nurse', 'Lawyer'])
            });
        }
    }
    
    // Get a random NPC
    getRandomNPC() {
        return getRandomItem(this.npcs);
    }
    
    // Get NPC by name
    getNPCByName(name) {
        return this.npcs.find(npc => npc.name === name);
    }
    
    // Try to make a new friend (random encounter)
    makeNewFriend(character) {
        const npc = this.getRandomNPC();
        
        // Check if already friends
        const existingRelationship = character.relationships.find(r => r.name === npc.name);
        if (existingRelationship) {
            return { success: false, message: `You already know ${npc.name}!` };
        }
        
        // Charisma check - higher charisma = better chance
        const charismaBonus = character.charisma / 100;
        const successChance = 0.4 + charismaBonus * 0.4; // 40-80% chance
        
        if (Math.random() < successChance) {
            character.addRelationship(npc);
            character.addHappiness(10);
            return { 
                success: true, 
                message: `You made a new friend: ${npc.name}!`,
                npc: npc
            };
        } else {
            character.addHappiness(-5);
            return { 
                success: false, 
                message: `You tried to make friends with ${npc.name}, but they weren't interested.`,
                npc: npc
            };
        }
    }
    
    // Ask someone on a date
    askOnDate(character, relationshipName) {
        const relationship = character.relationships.find(r => r.name === relationshipName);
        if (!relationship) return { success: false, message: 'Person not found!' };
        
        // Success based on affection and charisma
        const affectionBonus = relationship.affection / 100;
        const charismaBonus = character.charisma / 100;
        const successChance = 0.3 + (affectionBonus * 0.4) + (charismaBonus * 0.3);
        
        if (Math.random() < successChance) {
            relationship.affection = clamp(relationship.affection + 15, 0, 100);
            character.addHappiness(20);
            character.addMoney(-50); // Date costs money
            return { 
                success: true, 
                message: `Amazing date with ${relationshipName}! They really liked it.`
            };
        } else {
            relationship.affection = clamp(relationship.affection - 10, 0, 100);
            character.addHappiness(-15);
            return { 
                success: false, 
                message: `${relationshipName} turned down your date invitation. Ouch.`
            };
        }
    }
    
    // Propose marriage
    propose(character, relationshipName) {
        const relationship = character.relationships.find(r => r.name === relationshipName);
        if (!relationship) return { success: false, message: 'Person not found!' };
        
        // Need high affection to propose
        if (relationship.affection < 70) {
            return { 
                success: false, 
                message: `${relationshipName} isn't ready for marriage yet.`
            };
        }
        
        const successChance = 0.6 + (relationship.affection / 100) * 0.4;
        
        if (Math.random() < successChance) {
            relationship.type = 'spouse';
            relationship.affection = 100;
            character.addHappiness(50);
            character.addMoney(-2000); // Wedding costs
            character.addLifeEvent(`Married ${relationshipName}!`, 'positive');
            return { 
                success: true, 
                message: `${relationshipName} said yes! You got married!`
            };
        } else {
            relationship.affection = clamp(relationship.affection - 20, 0, 100);
            character.addHappiness(-30);
            return { 
                success: false, 
                message: `${relationshipName} said no to your proposal. That's rough.`
            };
        }
    }
    
    // Get divorced
    divorce(character, relationshipName) {
        const index = character.relationships.findIndex(r => r.name === relationshipName);
        if (index === -1) return false;
        
        character.relationships.splice(index, 1);
        character.addHappiness(-40);
        character.addMoney(-5000); // Legal fees
        character.addLifeEvent(`Divorced ${relationshipName}`, 'negative');
        return true;
    }
    
    // Have a baby with spouse
    haveBaby(character) {
        const spouse = character.relationships.find(r => r.type === 'spouse');
        
        if (!spouse || character.gender === 'male') {
            return { success: false, message: 'You cannot have a baby!' };
        }
        
        if (character.age < 18 || character.age > 50) {
            return { success: false, message: 'You are not in the right age to have a baby!' };
        }
        
        character.addHappiness(30);
        character.addMoney(-5000); // Hospital bills
        character.addAchievement('Parent');
        character.addLifeEvent(`Had a baby with ${spouse.name}!`, 'positive');
        
        return { 
            success: true, 
            message: `You had a beautiful baby with ${spouse.name}!`
        };
    }
    
    // Hang out with a friend (maintain relationship)
    hangOut(character, relationshipName) {
        const relationship = character.relationships.find(r => r.name === relationshipName);
        if (!relationship) return { success: false, message: 'Person not found!' };
        
        relationship.affection = clamp(relationship.affection + 5, 0, 100);
        relationship.trust = clamp(relationship.trust + 3, 0, 100);
        character.addHappiness(10);
        character.addMoney(-20); // Spend money on outing
        
        return { 
            success: true, 
            message: `Had a great time hanging out with ${relationshipName}!`
        };
    }
    
    // Get relationship status
    getRelationshipStatus(character) {
        return character.relationships.map(r => ({
            name: r.name,
            type: r.type,
            affection: r.affection,
            trust: r.trust
        }));
    }
}

// Create global relationship system
const relationshipSystem = new RelationshipSystem();
