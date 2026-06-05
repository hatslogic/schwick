<?php declare(strict_types=1);

namespace HDESakura\Subscriber;

use Shopware\Core\Content\Category\CategoryCollection;
use Shopware\Core\Content\Category\Service\NavigationLoaderInterface;
use Shopware\Core\Content\Category\Tree\TreeItem;
use Shopware\Storefront\Pagelet\Header\HeaderPageletLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ServiceMenuHeaderSubscriber implements EventSubscriberInterface
{
    public const SERVICE_MENU_EXTENSION = 'serviceMenu';

    public function __construct(
        private readonly NavigationLoaderInterface $navigationLoader,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            HeaderPageletLoadedEvent::class => 'onHeaderPageletLoaded',
        ];
    }

    public function onHeaderPageletLoaded(HeaderPageletLoadedEvent $event): void
    {
        $context = $event->getSalesChannelContext();
        $serviceCategoryId = $context->getSalesChannel()->getServiceCategoryId();

        if ($serviceCategoryId === null) {
            return;
        }

        $navigation = $this->navigationLoader->load(
            $serviceCategoryId,
            $context,
            $serviceCategoryId,
            1
        );

        $serviceMenu = new CategoryCollection(array_map(
            static fn (TreeItem $treeItem) => $treeItem->getCategory(),
            $navigation->getTree()
        ));

        $event->getPagelet()->addExtension(self::SERVICE_MENU_EXTENSION, $serviceMenu);
    }
}
