import json
import os
import random

# Base dataset of core standards (IT, Smart Automation, Civil, Mech, etc.)
CORE_STANDARDS = [
    # IT & Smart Automation (LITD)
    ("IS 17428 (Part 1)", "Data Privacy Assurance - Part 1 Engineering and Management Requirements", "Information Technology", "Sets out the requirements for establishing, implementing, maintaining and continually improving a Data Privacy Management System."),
    ("IS 17428 (Part 2)", "Data Privacy Assurance - Part 2 Engineering and Management Guidelines", "Information Technology", "Provides guidelines for data privacy assurance."),
    ("IS 16335", "Information Technology - Security Techniques - Information Security Incident Management", "Information Technology", "Basic concepts and phases of information security incident management."),
    ("IS 17975", "Internet of Things (IoT) - Reference Architecture", "Smart Automation", "General reference architecture for IoT systems and networks."),
    ("IS 17976", "Internet of Things (IoT) - Terminology", "Smart Automation", "Standard vocabulary for IoT implementations in smart cities and automation."),
    ("IS 18010", "Artificial Intelligence - Concepts and Terminology", "Smart Automation", "Fundamental concepts for AI systems."),
    ("IS 18011", "Artificial Intelligence - Framework for Machine Learning Systems", "Smart Automation", "Establishes a framework for ML development and deployment."),
    ("IS 17017 (Part 1)", "Electric Vehicle Conductive AC Charging System", "Smart Automation", "General requirements for EV AC charging stations."),
    ("IS 17017 (Part 21)", "Electric Vehicle Charging - Communication Protocol", "Smart Automation", "V2G (Vehicle-to-Grid) communication interface standard."),
    ("IS 16444", "A.c. Static Direct Connected Watt-Hour Smart Meter", "Smart Automation", "Specifications for smart electricity meters for smart grids."),
    ("IS 15489", "Information and Documentation - Records Management", "Information Technology", "Standardizes records management processes."),
    
    # Civil Engineering (CED)
    ("IS 456", "Plain and Reinforced Concrete - Code of Practice", "Civil Engineering", "General structural use of plain and reinforced concrete."),
    ("IS 800", "General Construction in Steel - Code of Practice", "Civil Engineering", "Design and construction of steel structures."),
    ("IS 1786", "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement", "Civil Engineering", "Requirements of deformed steel bars and wires for use as reinforcement in concrete."),
    ("IS 1893 (Part 1)", "Criteria for Earthquake Resistant Design of Structures", "Civil Engineering", "General provisions and buildings for earthquake resilience."),
    ("IS 2062", "Hot Rolled Medium and High Tensile Structural Steel", "Civil Engineering", "Requirements for steel used for structural purposes."),
    ("IS 4985", "Unplasticized PVC Pipes for Potable Water Supplies", "Civil Engineering", "PVC-U pipes intended for cold water services."),
    
    # Electrotechnical (ETD)
    ("IS 694", "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages up to 1100 V", "Electrotechnical", "PVC insulated cables for power and lighting."),
    ("IS 732", "Code of Practice for Electrical Wiring Installations", "Electrotechnical", "Essential requirements and practices in electrical installations for buildings."),
    ("IS 1293", "Plugs and Socket-Outlets of Rated Voltage up to 250 V", "Electrotechnical", "Requirements and tests for plugs and socket-outlets for household purposes."),
    ("IS 3854", "Switches for Domestic and Similar Purposes", "Electrotechnical", "Requirements for manually operated general purpose switches."),
    ("IS 16102 (Part 1)", "Self-Ballasted LED Lamps for General Lighting Services", "Electrotechnical", "Safety requirements for LED lamps."),
    
    # Mechanical Engineering (MED)
    ("IS 7390", "Furniture - Steel Office Chairs", "Mechanical Engineering", "Dimensions and performance requirements for steel office chairs."),
    ("IS 15683", "Portable Fire Extinguishers - Performance and Construction", "Mechanical Engineering", "Requirements for portable fire extinguishers."),
    ("IS 14489", "Code of Practice on Occupational Safety and Health Audit", "Mechanical Engineering", "Guidelines for occupational safety and health audit systems."),
    ("IS 1363 (Part 1)", "Hexagon Head Bolts, Screws and Nuts", "Mechanical Engineering", "Product grade C hexagon head bolts."),
    ("IS 1536", "Centrifugally Cast (Spun) Iron Pressure Pipes for Water, Gas and Sewage", "Mechanical Engineering", "Specifications for spun iron pipes."),
    
    # Textiles (TXD)
    ("IS 11871", "Methods for Determination of Flammability and Flame Resistance of Textile Fabrics", "Textiles", "Test methods for flame retardant clothing."),
    ("IS 15748", "Protective Clothing for Industrial Workers", "Textiles", "Safety apparel requirements against mechanical and thermal hazards."),
    ("IS 17309", "Geotextiles - Specifications for Subgrade Stabilization", "Textiles", "Geotextiles used in road and highway construction."),
    
    # Medical Equipment (MHD)
    ("IS 13450 (Part 1)", "Medical Electrical Equipment - General Requirements for Basic Safety", "Medical", "Safety testing for hospital electrical devices."),
    ("IS 16289", "Medical Face Masks - Requirements and Test Methods", "Medical", "Specifications for surgical and N95 grade medical masks."),
    ("IS 17624", "Non-Invasive Sphygmomanometers", "Medical", "Requirements for electronic blood pressure measuring devices."),
    
    # Chemicals (CHD)
    ("IS 10500", "Drinking Water - Specification", "Chemicals", "Requirements and methods of sampling and test for drinking water."),
    ("IS 15410", "Packaged Drinking Water (Other than Natural Mineral Water)", "Chemicals", "Quality standards for bottled drinking water."),
    ("IS 2720", "Methods of Test for Soils", "Chemicals", "Soil testing methodology for chemical and physical properties."),
    
    # Food & Agriculture (FAD)
    ("IS 11536", "Processed Cereal Based Complementary Foods", "Food & Agriculture", "Specifications for infant cereal foods."),
    ("IS 15495", "Printing Ink for Food Packaging - Code of Practice", "Food & Agriculture", "Safety limits for inks used in food wrappers."),
    ("IS 15997", "Low Carbon Sugar - Specification", "Food & Agriculture", "Requirements for low carbon emission sugar processing.")
]

def generate_standards(count=100):
    standards = []
    
    # First add all core standards
    for idx, (is_num, title, category, scope) in enumerate(CORE_STANDARDS):
        std_id = f"std-core-{idx}"
        std = {
            "is_number": is_num,
            "is_number_base": is_num.split(" ")[0].split(":")[0],
            "title": title,
            "scope": scope,
            "classification": category,
            "status": "current",
            "cross_references": []
        }
        standards.append(std)
        
    # Generate variations and extensions to reach 100
    departments = ["Information Technology", "Smart Automation", "Civil Engineering", "Electrotechnical", 
                   "Mechanical Engineering", "Textiles", "Medical", "Chemicals", "Food & Agriculture", "Metallurgy"]
                   
    smart_topics = [
        "Smart City Sensor Networks", "Blockchain for Supply Chain", "Cloud Computing Security",
        "Edge Computing Protocols", "Autonomous Vehicle Communications", "Industrial IoT Devices",
        "Smart Water Metering", "Biometric Access Systems", "Drones for Agricultural Spraying",
        "Predictive Maintenance Algorithms"
    ]
    
    i = len(standards)
    while len(standards) < count:
        dept = random.choice(departments)
        
        # Bias heavily towards IT/Smart Automation
        if random.random() < 0.4: 
            dept = random.choice(["Information Technology", "Smart Automation"])
            
        base_num = random.randint(18000, 22000)
        is_num = f"IS {base_num}"
        
        if dept in ["Information Technology", "Smart Automation"]:
            topic = random.choice(smart_topics)
            title = f"{topic} - General Requirements and Interoperability"
            scope = f"Specifies the architecture, data formats, and security requirements for {topic.lower()} in government deployments."
        else:
            title = f"General Specifications for {dept} Materials - Part {random.randint(1, 5)}"
            scope = f"Provides guidelines and test methods for {dept.lower()} products to ensure quality and safety compliance."
            
        std = {
            "is_number": f"{is_num}:{random.choice([2019, 2020, 2021, 2022, 2023, 2024])}",
            "is_number_base": is_num,
            "title": title,
            "scope": scope,
            "classification": dept,
            "status": random.choice(["current", "current", "current", "superseded"]),
            "cross_references": []
        }
        standards.append(std)
    
    # Add cross-references (Edges for the graph)
    for std in standards:
        if random.random() < 0.7:  # 70% chance to have a reference
            num_refs = random.randint(1, 3)
            possible_targets = [s for s in standards if s["is_number"] != std["is_number"]]
            targets = random.sample(possible_targets, num_refs)
            
            for t in targets:
                edge_type = random.choice(["normative_ref", "normative_ref", "informative_ref", "supersedes"])
                std["cross_references"].append({
                    "is_number": t["is_number"],
                    "type": edge_type
                })
                
    # Save to JSON
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'standards.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(standards, f, indent=4)
        
    print(f"Generated {len(standards)} highly realistic standards with cross-references at {output_path}")

if __name__ == "__main__":
    generate_standards(100)
