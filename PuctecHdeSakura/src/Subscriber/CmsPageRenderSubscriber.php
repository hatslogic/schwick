<?php declare(strict_types=1);

namespace PuctecHdeSakura\Subscriber;

use Shopware\Storefront\Event\StorefrontRenderEvent;
use Shopware\Storefront\Page\GenericPageLoaderInterface;
use Shopware\Storefront\Page\Page;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CmsPageRenderSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly GenericPageLoaderInterface $genericPageLoader,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            StorefrontRenderEvent::class => 'onStorefrontRender',
        ];
    }

    public function onStorefrontRender(StorefrontRenderEvent $event): void
    {
        $parameters = $event->getParameters();
        $page = $parameters['page'] ?? null;

        // CmsController::pageFull passes ['page' => ['cmsPage' => $cmsPageEntity]] as an array
        if (is_array($page) && isset($page['cmsPage']) && !$page instanceof Page) {
            $genericPage = $this->genericPageLoader->load($event->getRequest(), $event->getSalesChannelContext());
            $genericPage->assign(['cmsPage' => $page['cmsPage']]);
            $event->setParameter('page', $genericPage);
        }
    }
}
