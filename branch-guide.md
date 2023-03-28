## Stratégie de branching
Nous utilisons GitHub Workflow : https://guides.github.com/introduction/flow/. 
Chaque développement (fonctionnalité / bug) devra passer par une branche. Cette dernière devra être validée par une Pull Request.

La PR devra être liée à un work item et passer le build CI pour qu'il soit valide. A chaque PR, une nouvelle application staging via un slot est créé pour qu'on puisse tester avant de merger sur master.