"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Trophy, Save, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Team = {
  id: string;
  name: string;
  members: Array<{
    userId: string;
    userName: string;
  }> | null;
};

type RatingsTabProps = {
  eventId: string;
  teams: Team[];
  isAdmin: boolean;
};

export function RatingsTab({
  eventId,
  teams,
  isAdmin,
}: RatingsTabProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [existingVote, setExistingVote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExistingVote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const fetchExistingVote = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/ratings`);
      if (response.ok) {
        const data = await response.json();
        if (data.vote?.player_id) {
          setExistingVote(data.vote.player_id);
          setSelectedPlayerId(data.vote.player_id);
        }
      }
    } catch (error) {
      console.error("Error fetching vote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVote = async () => {
    if (!selectedPlayerId) {
      toast({
        title: "Nenhum jogador selecionado",
        description: "Selecione um jogador como Craque da Partida",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/events/${eventId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ratedUserId: selectedPlayerId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao salvar voto");
      }

      toast({
        title: "Voto registrado!",
        description: "Seu voto para Craque da Partida foi salvo",
      });

      setExistingVote(selectedPlayerId);
      router.refresh();
    } catch (error) {
      toast({
        title: "Erro ao salvar voto",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando votação...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Craque da Partida
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? "Como admin, você pode votar em qualquer jogador"
              : "Selecione o jogador que se destacou nesta partida"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedPlayerId || ""}
            onValueChange={setSelectedPlayerId}
          >
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    {team.name}
                    <Badge variant="secondary" className="text-xs">
                      {team.members?.length || 0} jogadores
                    </Badge>
                  </h3>

                  <div className="space-y-2">
                    {team.members?.map((player) => {
                      const isSelected = selectedPlayerId === player.userId;
                      const hasExistingVote = existingVote === player.userId;

                      return (
                        <div
                          key={player.userId}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                              : "border-muted bg-muted/30 hover:border-muted-foreground/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={player.userId}
                              id={player.userId}
                            />
                            <Label
                              htmlFor={player.userId}
                              className="flex-1 cursor-pointer flex items-center justify-between"
                            >
                              <span className="font-medium">{player.userName}</span>
                              {hasExistingVote && (
                                <div className="flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>Seu voto</span>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSaveVote}
              disabled={isSaving || !selectedPlayerId}
              size="lg"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Salvar Voto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
