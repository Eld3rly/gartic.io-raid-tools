const chalk = require("chalk");
const prompts = require("prompts");
const Client = require("./client.js");
const fs = require("fs");

console.clear();
console.log(chalk.green("Welcome to the Gartic.io raid tools!"));
console.log(chalk.green("Written by github.com/Eld3rly"));
showCommands()

process.title = "Gartic.io Raid Tools";

const bots = [];

async function main() {
    const input = await prompts([
        {
            type: "text",
            name: "command",
            message: "Enter a command",
        }
    ]);
    if (input.command === "help") {
        showCommands();
        main();
    } else if (input.command === "exit") {
        console.log(chalk.green("Good bye!"));
        process.exit();
    } else if (input.command === "clear") {
        console.clear();
        main();
    } else if (input.command === "connect") {
        const input = await prompts([
            {
                type: "number",
                name: "id",
                message: "Enter the server ID",
            },
            {
                type: "text",
                name: "invite",
                message: "Enter the invite code",
            },
            {
                type: "text",
                name: "name",
                message: "Enter a name for bots",
            },
            {
                type: "number",
                name: "amount",
                message: "Enter the amount of bots to spawn",
            },
            {
                type: "multiselect",
                name: "epilepsy",
                message: "Enable epilepsy mode?",
                instructions: false,
                choices: [
                    { title: "True", value: true },
                    { title: "False", value: false }
                ],
            }
        ]);
        if (!input.id || !input.invite || !input.name || !input.amount) {
            console.log(chalk.red("Please enter all the required information"));
            return main();
        }
        console.log(chalk.magenta("Press Ctrl+C to stop"));
        console.log(chalk.green("Verifying server..."));
        const check = new Client({id: input.id, invite: input.invite, name: "Anonymous"});
        check.on("roomConnected", data => {
            console.log(chalk.green("Server verified!"));
            check.disconnect();
            for (let i = 0; i < input.amount; i++) {
                console.log(chalk.green(`Spawning bot ${i+1}/${input.amount}`));
                const bot = new Client({id: input.id, invite: input.invite, name: `${input.name}${i+1}`, epilepsy: input.epilepsy})
                bots.push(bot);
                bot.connect()
            }
        });
        check.on("roomInvalid", data => {
            console.log(chalk.red("Server not found!"));
            check.disconnect();
            main();
        });
        check.connect();
    } else if (input.command === "spam") {
        const input = await prompts([
            {
                type: "number",
                name: "id",
                message: "Enter the server ID",
            },
            {
                type: "text",
                name: "invite",
                message: "Enter the invite code",
            },
            {
                type: "text",
                name: "name",
                message: "Enter a name for bots",
            },
            {
                type: "number",
                name: "amount",
                message: "Enter the amount of bots to spawn",
            },
            {
                type: "text",
                name: "msg",
                message: "Enter the message to spam",
            }
        ]);
        if (!input.id || !input.invite || !input.name || !input.amount|| !input.msg) {
            console.log(chalk.red("Please enter all the required information"));
            return main();
        }
        console.log(chalk.magenta("Press Ctrl+C to stop"));
        console.log(chalk.green("Verifying server..."));
        const check = new Client({id: input.id, invite: input.invite, name: "Anonymous"});
        check.on("roomConnected", data => {
            console.log(chalk.green("Server verified!"));
            check.disconnect();
            for (let i = 0; i < input.amount; i++) {
                console.log(chalk.green(`Spawning bot ${i+1}/${input.amount}`));
                const bot = new Client({id: input.id, invite: input.invite, name: `${input.name}${i+1}`})
                bots.push(bot);
                bot.on("roomConnected", _ =>{bot.sendAnswer(input.msg);bot.disconnect();})
                bot.on("disconnected", bot.connect);
                bot.connect()
            }
        });
        check.on("roomInvalid", data => {
            console.log(chalk.red("Server not found!"));
            check.disconnect();
            main();
        });
        check.connect();
    } else if (input.command === "cfg") {
        try {
            const cfg = JSON.parse(fs.readFileSync("./config.json"));
            if (!cfg.mode || !cfg.id || !cfg.invite || !cfg.name || !cfg.amount) {
                console.log(chalk.red("Please enter all the required information"));
                return main();
            }
            if(cfg.mode === "spam"){

                console.log(chalk.magenta("Press Ctrl+C to stop"));
                console.log(chalk.green("Verifying server..."));
                const check = new Client({id: cfg.id, invite: cfg.invite, name: "Anonymous"});
                check.on("roomConnected", data => {
                    console.log(chalk.green("Server verified!"));
                    check.disconnect();
                    for (let i = 0; i < cfg.amount; i++) {
                        console.log(chalk.green(`Spawning bot ${i+1}/${cfg.amount}`));
                        const bot = new Client({id: cfg.id, invite: cfg.invite, name: `${cfg.name}${i+1}`})
                        bots.push(bot);
                        bot.on("roomConnected", _ =>{bot.sendAnswer(cfg.message);bot.disconnect();})
                        bot.on("disconnected", bot.connect);
                        bot.connect()
                    }
                });
                check.on("roomInvalid", data => {
                    console.log(chalk.red("Server not found!"));
                    check.disconnect();
                    main();
                });
                check.connect();

            } else if(cfg.mode === "connect"){

                console.log(chalk.magenta("Press Ctrl+C to stop"));
                console.log(chalk.green("Verifying server..."));
                const check = new Client({id: cfg.id, invite: cfg.invite, name: "Anonymous"});
                check.on("roomConnected", data => {
                    console.log(chalk.green("Server verified!"));
                    check.disconnect();
                    for (let i = 0; i < cfg.amount; i++) {
                        console.log(chalk.green(`Spawning bot ${i+1}/${cfg.amount}`));
                        const bot = new Client({id: cfg.id, invite: cfg.invite, name: `${cfg.name}${i+1}`, epilepsy: cfg.epilepsy});
                        bots.push(bot);
                        bot.connect();
                    }
                });
                check.on("roomInvalid", data => {
                    console.log(chalk.red("Server not found!"));
                    check.disconnect();
                    main();
                });
                check.connect();

            } else {
                console.log(chalk.red("Please enter a valid mode!"));
                main();
            }
        } catch (error) {
            console.log(chalk.red("Cannot read file!"));
            main();
        }
    } else if(input.command == "ckick"){
		const input = await prompts([
			{
				type: "number",
				name: "id",
				message: "Enter the server ID",
			},
			{
				type: "text",
				name: "invite",
				message: "Enter the invite code",
			},
			{
				type: "text",
				name: "name",
				message: "Enter a name for bots",
			},
			{
				type: "number",
				name: "amount", // 31J2
				message: "Enter the amount of bots to spawn",
			}
		]);
		if (!input.id || !input.invite || !input.name || !input.amount) {
			console.log(chalk.red("Please enter all the required information"));
			return main();
		}
		console.log(chalk.magenta("Press Ctrl+C to stop"));
		console.log(chalk.green("Verifying server..."));
		const check = new Client({id: input.id, invite: input.invite, name: "Anonymous"});
		check.on("roomConnected", async data => {
			console.log(chalk.green("Server verified!"));
			check.disconnect();
			const users = data[5].map((user, index) => (chalk.cyan(`[${index}]`)+" "+chalk.green(user.nick)+chalk.yellow(" - ")+chalk.red(user.id)) );
			
			console.log(chalk.green("Users:"));
			console.log(users.join("\n"));

			const input2 = await prompts([
				{
					type: "number",
					name: "id",
					message: "Enter the Index of the user to kick",
				}
			]);
			if(!data[5][input2.id]) {
				console.log(chalk.red("Invalid Index!"));
				return main();
			}

			for (let i = 0; i < input.amount; i++) {
				console.log(chalk.green(`Spawning bot ${i+1}/${input.amount}`));
				const bot = new Client({id: input.id, invite: input.invite, name: `${input.name}${i+1}`})
				bots.push(bot);
				bot.on("roomConnected", _ =>{

					setTimeout(() => {
						console.log(chalk.green(`Kicking user ${data[5][input2.id].nick} (${data[5][input2.id].id})`));
						bot.voteKick(data[5][input2.id].id);
					}, Math.floor(Math.random() * 29000) + 1);
					setTimeout(() => {
						bot.disconnect();
					}, 30000);
				})
				bot.on("disconnected", bot.connect);
				bot.connect()
			}
		});
		check.on("roomInvalid", data => {
			console.log(chalk.red("Server not found!"));
			check.disconnect();
			main();
		});
		check.connect();
	} else {
        console.log(chalk.red("Invalid command! use help to see the commands"));
        main();
    }
}
function showCommands() {
    console.log(chalk.cyan(`Commands:
    - help: Show this help message
    - exit: Exit the program
    - clear: Clear the console
    - connect: Connect to a server
    - spam: Spam a message to the server
    - cfg: Lauch attack by config
	- ckick: Kick a user in a server`));
}
main();

process.on("SIGINT", () => {
    if(bots.length <= 0) return;
    console.log(chalk.red("\nStopping all bots..."));
    for (const bot of bots) {
        bot.destroy();
        delete bot;
    }
    bots.splice(0,bots.length);
    main();
});