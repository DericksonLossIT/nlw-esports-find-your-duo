import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";

import { Check, GameController } from "phosphor-react";

import Input from "./Form/Input";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
}

const CreateAdModal = ({}) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesInput, setGamesInput] = useState("");

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  function getGameId(games: Game[], gameInput: String) {
    let selectedGameId = games.find((game) => {
      if (game.title === gameInput) {
        return game.id;
      }
    });
    return selectedGameId?.id;
  }

  async function handleCreateAd(event: FormEvent) {
    event?.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    const gameId = getGameId(games, gamesInput);

    if (!data.name) {
      return;
    }

    try {
      axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(String),
        hoursStart: data.hoursStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar anúncio!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 rounded-lg w-[460px] shadow-black/25">
        <Dialog.Title className="text-3xl text-white font-black">
          Publique um anúncio!
        </Dialog.Title>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Qual o game?
            </label>
            <Select.Root name="game" onValueChange={setGamesInput}>
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex justify-between">
                <Select.Value placeholder="Escolha um game..." />
                <Select.Icon />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {games.map((game) => {
                      return (
                        <Select.Item
                          key={game.id}
                          value={game.title}
                          className="text-white py-3 pl-1 rounded hover:bg-violet-500"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">{`Seu nome (ou nickname)`}</label>
            <Input type="text" id="name" name="name" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hoursStart">Qual horário do dia?</label>
            <div className="grid grid-cols-2 gap-1">
              <Input
                type="time"
                name="hoursStart"
                id="hoursStart"
                placeholder="De"
              />
              <Input
                type="time"
                name="hourEnd"
                id="hourEnd"
                placeholder="Até"
              />
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CreateAdModal;
