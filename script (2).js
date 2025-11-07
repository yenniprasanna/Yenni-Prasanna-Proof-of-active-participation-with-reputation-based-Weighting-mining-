// Simple interactions for the platform
document.addEventListener('DOMContentLoaded', function() {
    // Wallet connection simulation
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                if (this.textContent.includes('0x8f1')) {
                    this.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
                } else {
                    this.innerHTML = '<i class="fas fa-wallet"></i> 0x8f1...4c3a';
                }
            }
        });
    }

    // Action buttons
    const actionBtns = document.querySelectorAll('.action-btn:not(.primary):not(.secondary):not(.success):not(.danger)');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.closest('tr')?.querySelector('.event-name')?.textContent || 'Event';
            showNotification(`Participating in: ${eventName}`);
        });
    });

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Stake tabs
    const stakeTabs = document.querySelectorAll('.stake-tab');
    stakeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            stakeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Max button for staking
    const maxBtn = document.querySelector('.max-btn');
    if (maxBtn) {
        maxBtn.addEventListener('click', function() {
            const input = this.closest('.form-group').querySelector('input');
            input.value = '45'; // Available balance
        });
    }

    // Voting buttons
    const voteBtns = document.querySelectorAll('.action-btn.success, .action-btn.danger');
    voteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const proposal = this.closest('.proposal-card').querySelector('h3').textContent;
            const vote = this.classList.contains('success') ? 'Yes' : 'No';
            showNotification(`Voted ${vote} on: ${proposal}`);
        });
    });

    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const actionName = this.querySelector('.action-title').textContent;
            showNotification(`Opening: ${actionName}`);
        });
    });

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: var(--primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});