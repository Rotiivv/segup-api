import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { api } from "@/lib/axios";

async function createRegistration(request: Request) {
  const body = await request.json();
  const response = await api.post("/api/registration", body);

  return NextResponse.json(response.data, { status: response.status });
}

async function listRegistrationsByCpf(cpf: string) {
  const response = await api.get(`/api/registration/${cpf}/all`);

  return NextResponse.json(response.data, { status: response.status });
}

async function updateServiceRegistration(id: string, request: Request) {
  const body = await request.json();
  const response = await api.patch(`/api/registration/${id}/service`, body);

  return NextResponse.json(response.data, { status: response.status });
}

async function cancelRegistration(id: string) {
  const response = await api.patch(`/api/registration/${id}/cancel`);

  return NextResponse.json(response.data, { status: response.status });
}

async function confirmRegistration(id: string) {
  const response = await api.patch(`/api/registration/${id}/confirm`);

  return NextResponse.json(response.data, { status: response.status });
}

function handleAxiosError(error: unknown, message: string) {
  if (isAxiosError(error)) {
    return NextResponse.json(error.response?.data ?? { message }, {
      status: error.response?.status ?? 500,
    });
  }

  return NextResponse.json({ message }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    return await createRegistration(request);
  } catch (error) {
    return handleAxiosError(error, "Erro ao criar registro.");
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ routes?: string[] }> },
) {
  try {
    const params = await context.params;

    const cpf = new URL(request.url).searchParams.get("cpf");

    if (!params.routes?.length && cpf) {
      return await listRegistrationsByCpf(cpf);
    }

    if (params.routes?.length === 2 && params.routes[1] === "all") {
      return await listRegistrationsByCpf(params.routes[0]);
    }

    return NextResponse.json(
      { message: "Rota não encontrada." },
      { status: 404 },
    );
  } catch (error) {
    return handleAxiosError(error, "Erro ao listar registros.");
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ routes?: string[] }> },
) {
  try {
    const params = await context.params;

    if (params.routes?.length === 2 && params.routes[1] === "service") {
      return await updateServiceRegistration(params.routes[0], request);
    }

    if (params.routes?.length === 2 && params.routes[1] === "cancel") {
      return await cancelRegistration(params.routes[0]);
    }

    if (params.routes?.length === 2 && params.routes[1] === "confirm") {
      return await confirmRegistration(params.routes[0]);
    }

    return NextResponse.json(
      { message: "Rota não encontrada." },
      { status: 404 },
    );
  } catch (error) {
    const params = await context.params;
    const isServiceRoute = params.routes?.[1] === "service";
    const isConfirmRoute = params.routes?.[1] === "confirm";
    return handleAxiosError(
      error,
      isServiceRoute
        ? "Erro ao atualizar o serviço."
        : isConfirmRoute
          ? "Erro ao confirmar a presença."
          : "Erro ao cancelar o registro.",
    );
  }
}
