import { Inject, Injectable, Logger } from '@nestjs/common';
import type { OrderCreatedEvent } from '@app/contracts';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) { }

  async sendOrderNotification(data: OrderCreatedEvent) {
    if (
      process.env.NOTIFICATIONS_SIMULATE_FAILURE === 'true' &&
      Number(data.total) === 9999
    ) {
      throw new Error('Falha simulada');
    }
    const created = await this.prisma.$transaction(async (tx) => {
      const inserted = await tx.processedEvent.createMany({
        data: [{ eventId: data.eventId }],
        skipDuplicates: true,
      });
      if (!inserted.count) return false;
      await tx.notification.create({
        data: {
          eventId: data.eventId,
          orderId: data.orderId,
          userId: data.userId,
          total: data.total,
        },
      });
      return true;
    });
    if (created)
      this.logger.log(
        `Notificação do pedido ${data.orderId} | Usuário: ${data.userId} | Total: R$ ${data.total} | Evento: ${data.eventId}`,
      );
    return { success: true, duplicate: !created };
  }
}
